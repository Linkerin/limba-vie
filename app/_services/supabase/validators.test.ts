import { describe, expect, test } from 'vitest';

import { isUserReportRecord } from './validators';

describe('isUserReportRecord', () => {
  test('should return true for a valid record', () => {
    const record = {
      type: 'incorrect_ro',
      comment: 'This is a comment',
      word_id: 123,
      user_id: 'user123',
      created_at: '2023-10-01T00:00:00Z',
      updated_at: '2023-10-02T00:00:00Z'
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(true);
  });

  test('should return true for a record with only mandatory fields correctly typed', () => {
    const record = {
      type: 'incorrect_ro'
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(true);
  });

  test('should return true for a record with optional fields set to undefined', () => {
    const record = {
      type: 'incorrect_ro',
      comment: undefined,
      word_id: undefined,
      grammar_article: undefined,
      user_id: undefined,
      created_at: undefined,
      updated_at: undefined
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(true);
  });

  test('should return true for a record with null values for nullable fields', () => {
    const record = {
      type: 'incorrect_ro',
      word_id: null,
      grammar_article: null,
      user_id: null
    };
    expect(isUserReportRecord(record)).toBe(true);
  });

  test('should return false when the record is missing a required field', () => {
    const record: any = {
      comment: 'This is a comment',
      word_id: 42
    };

    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false when the record has an invalid type', () => {
    const record: any = {
      type: 'incorrect_ro',
      comment: 'This is a comment',
      word_id: 42,
      user_id: 'user-id',
      invalidField: 'invalidValue'
    };

    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false when the record both word_id and grammar_article', () => {
    const record: any = {
      type: 'incorrect_ro',
      comment: 'This is a comment',
      word_id: 42,
      grammar_article: 'This is an article',
      user_id: 'user-id',
      invalidField: 'invalidValue'
    };

    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false for a record with type not in REPORT_TYPES', () => {
    const record = {
      type: 'invalid_type'
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false for a record with word_id as NaN', () => {
    const record = {
      type: 'incorrect_ro',
      word_id: NaN
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false for a record with created_at as a non-string', () => {
    const record = {
      type: 'incorrect_ro',
      comment: 'This is a comment',
      word_id: 123,
      created_at: 12345,
      updated_at: '2023-10-02T00:00:00Z'
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false for a record with updated_at as a non-string', () => {
    const record = {
      type: 'incorrect_ro',
      comment: 'This is a comment',
      word_id: 123,
      created_at: '2023-10-01T00:00:00Z',
      updated_at: 12345
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });
});
