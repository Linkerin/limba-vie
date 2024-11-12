import { REPORT_TYPES } from '@/app/_lib/constants';
import type { Tables } from './supabase.types';

/**
 * Checks if the provided record is a valid user report record.
 * @param record - The record to be checked.
 * @returns A boolean indicating whether the record is a valid user report record.
 */
export function isUserReportRecord(
  record: any
): record is Tables<'user_reports'> {
  if (
    !record.type ||
    typeof record.type !== 'string' ||
    !REPORT_TYPES.includes(record.type)
  ) {
    return false;
  }

  const keys = Object.keys(record);
  const allowedKeys = new Set([
    'type',
    'comment',
    'word_id',
    'grammar_article',
    'user_id',
    'created_at',
    'updated_at'
  ]);
  if (!keys.every(key => allowedKeys.has(key))) {
    return false;
  }

  if (
    typeof record.comment !== 'undefined' &&
    typeof record.comment !== 'string'
  ) {
    return false;
  }

  if (
    typeof record.word_id !== 'undefined' &&
    typeof record.word_id !== 'number' &&
    record.word_id !== null
  ) {
    return false;
  }

  if (typeof record.word_id === 'number' && isNaN(record.word_id)) {
    return false;
  }

  if (
    typeof record.grammar_article !== 'undefined' &&
    typeof record.grammar_article !== 'string' &&
    record.grammar_article !== null
  ) {
    return false;
  }

  if (
    typeof record.user_id !== 'undefined' &&
    typeof record.user_id !== 'string' &&
    record.user_id !== null
  ) {
    return false;
  }

  // check if user_id is a valid UUID
  if (typeof record.user_id === 'string' && record.user_id.length !== 36) {
    return false;
  }

  if (
    typeof record.created_at !== 'undefined' &&
    typeof record.created_at !== 'string'
  ) {
    return false;
  }

  if (
    typeof record.updated_at !== 'undefined' &&
    typeof record.updated_at !== 'string'
  ) {
    return false;
  }

  if (
    typeof record.word_id === 'number' &&
    typeof record.grammar_article === 'string'
  ) {
    return false;
  }

  return true;
}
