export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      sets: {
        Row: {
          created_at: string;
          emoji: string | null;
          id: number;
          order: number | null;
          set: string;
          unit_id: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          emoji?: string | null;
          id?: number;
          order?: number | null;
          set: string;
          unit_id?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          emoji?: string | null;
          id?: number;
          order?: number | null;
          set?: string;
          unit_id?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'sets_new_unit_id_fkey';
            columns: ['unit_id'];
            isOneToOne: false;
            referencedRelation: 'units';
            referencedColumns: ['id'];
          }
        ];
      };
      sets_old: {
        Row: {
          created_at: string;
          emoji: string | null;
          id: number;
          prev_set_id: number | null;
          set: string;
          unit: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          emoji?: string | null;
          id?: number;
          prev_set_id?: number | null;
          set: string;
          unit: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          emoji?: string | null;
          id?: number;
          prev_set_id?: number | null;
          set?: string;
          unit?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      units: {
        Row: {
          created_at: string;
          id: number;
          image: string | null;
          name: string;
          prev_unit: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image?: string | null;
          name?: string;
          prev_unit?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          image?: string | null;
          name?: string;
          prev_unit?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_reports: {
        Row: {
          comment: string | null;
          created_at: string;
          grammar_article: string | null;
          id: string;
          type: Database['public']['Enums']['user_report_type'];
          updated_at: string;
          user_id: string | null;
          word_id: number | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          grammar_article?: string | null;
          id?: string;
          type: Database['public']['Enums']['user_report_type'];
          updated_at?: string;
          user_id?: string | null;
          word_id?: number | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          grammar_article?: string | null;
          id?: string;
          type?: Database['public']['Enums']['user_report_type'];
          updated_at?: string;
          user_id?: string | null;
          word_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_reports_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_reports_word_id_fkey';
            columns: ['word_id'];
            isOneToOne: false;
            referencedRelation: 'words';
            referencedColumns: ['id'];
          }
        ];
      };
      words: {
        Row: {
          audio_name: string | null;
          created_at: string;
          en: string;
          en_alternatives: string[] | null;
          example_en: string | null;
          example_ro: string | null;
          gender_ro: Database['public']['Enums']['gender_ro'] | null;
          id: number;
          img_name: string | null;
          instagram: boolean;
          plural: boolean;
          ro: string;
          ro_plural: string | null;
          set_id: number;
          updated_at: string;
        };
        Insert: {
          audio_name?: string | null;
          created_at?: string;
          en: string;
          en_alternatives?: string[] | null;
          example_en?: string | null;
          example_ro?: string | null;
          gender_ro?: Database['public']['Enums']['gender_ro'] | null;
          id?: number;
          img_name?: string | null;
          instagram?: boolean;
          plural?: boolean;
          ro: string;
          ro_plural?: string | null;
          set_id: number;
          updated_at?: string;
        };
        Update: {
          audio_name?: string | null;
          created_at?: string;
          en?: string;
          en_alternatives?: string[] | null;
          example_en?: string | null;
          example_ro?: string | null;
          gender_ro?: Database['public']['Enums']['gender_ro'] | null;
          id?: number;
          img_name?: string | null;
          instagram?: boolean;
          plural?: boolean;
          ro?: string;
          ro_plural?: string | null;
          set_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'words_set_id_fkey';
            columns: ['set_id'];
            isOneToOne: false;
            referencedRelation: 'sets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'words_set_id_fkey';
            columns: ['set_id'];
            isOneToOne: false;
            referencedRelation: 'sets_view';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      sets_view: {
        Row: {
          created_at: string | null;
          emoji: string | null;
          id: number | null;
          order: number | null;
          set: string | null;
          unit_id: number | null;
          updated_at: string | null;
          words_count: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'sets_new_unit_id_fkey';
            columns: ['unit_id'];
            isOneToOne: false;
            referencedRelation: 'units';
            referencedColumns: ['id'];
          }
        ];
      };
      units_view: {
        Row: {
          created_at: string | null;
          id: number | null;
          image: string | null;
          name: string | null;
          position: number | null;
          prev_unit: number | null;
          sets_count: number | null;
          updated_at: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      gender_ro: 'm' | 'n' | 'f';
      user_report_type:
        | 'incorrect_ro'
        | 'incorrect_en'
        | 'offensive'
        | 'image_audio'
        | 'answer'
        | 'other';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
