import type { NextRequest } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/app/_lib/supabase.types';

export const runtime = 'edge';
export const preferredRegion = ['iad1', 'hnd1'];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY ?? '';
const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
  try {
    const hookSecret = request.headers.get('supabase-hook-secret');
    if (hookSecret !== process.env.SUPABASE_HOOK_SECRET) {
      throw new Error('Invalid client');
    }

    const data = await request.json();
    const record = data.record;

    if (!record.ro || !record.id) {
      const res = new Response(JSON.stringify({ message: 'Invalid payload' }), {
        status: 400
      });
      return res;
    }

    const generationConfig = {
      response_mime_type: 'application/json'
    };
    const prompt = `Generate a simple sentence in Romanian language for beginner language learners
                  with the word \`${record.ro}\` and it's translation into English.
                  JSON response fields: \`ro\` and \`en\``;

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig
    };
    const params = new URLSearchParams({ key: `${process.env.GOOGLE_AI_KEY}` });

    const url = new URL(
      '/v1beta/models/gemini-1.5-pro-latest:generateContent',
      'https://generativelanguage.googleapis.com'
    );
    url.search = params.toString();

    const res = await fetch(url.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error.message);
    }

    const result = await res.json();
    const sentences = JSON.parse(
      result?.candidates[0]?.content?.parts[0]?.text
    )[0];

    if (sentences.en?.length > 0 && sentences.ro?.length > 0) {
      const { error } = await supabaseAdmin
        .from('words')
        .update({
          example_ro: sentences.ro,
          example_en: sentences.en,
          updated_at: new Date().toUTCString()
        })
        .eq('id', record.id);
      if (error) throw error;
    }

    return new Response(null, { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Error occured while fetching Google AI' }),
      { status: 500 }
    );
  }
}
