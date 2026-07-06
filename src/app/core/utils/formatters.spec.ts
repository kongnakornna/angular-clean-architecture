import { Formatters } from './formatters';

describe('Formatters', () => {
  describe('fileSize', () => {
    it('should return "0 Bytes" for 0', () => {
      expect(Formatters.fileSize(0)).toBe('0 Bytes');
    });

    it('should format bytes correctly', () => {
      expect(Formatters.fileSize(1024)).toBe('1 KB');
    });

    it('should format megabytes correctly', () => {
      expect(Formatters.fileSize(1048576)).toBe('1 MB');
    });
  });

  describe('phoneNumber', () => {
    it('should format 10-digit phone number', () => {
      expect(Formatters.phoneNumber('0812345678')).toBe('081-234-5678');
    });

    it('should format 9-digit phone number', () => {
      expect(Formatters.phoneNumber('021234567')).toBe('02-123-4567');
    });
  });

  describe('jobNumber', () => {
    it('should generate formatted job number', () => {
      const result = Formatters.jobNumber('JC', 2026, 1);
      expect(result).toBe('JC-2026-0001');
    });
  });
});
