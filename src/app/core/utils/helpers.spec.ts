import { Helpers } from './helpers';

describe('Helpers', () => {
  describe('truncate', () => {
    it('should return original string if within max length', () => {
      expect(Helpers.truncate('Hello', 10)).toBe('Hello');
    });

    it('should truncate and add ellipsis', () => {
      expect(Helpers.truncate('Hello World', 5)).toBe('Hello...');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct color for pending', () => {
      expect(Helpers.getStatusColor('pending')).toBe('bg-yellow');
    });

    it('should return bg-gray for unknown status', () => {
      expect(Helpers.getStatusColor('unknown')).toBe('bg-gray');
    });
  });

  describe('getStatusLabel', () => {
    it('should return Thai label for pending', () => {
      expect(Helpers.getStatusLabel('pending')).toBe('รอดำเนินการ');
    });

    it('should return original for unknown status', () => {
      expect(Helpers.getStatusLabel('unknown')).toBe('unknown');
    });
  });

  describe('getPriorityLabel', () => {
    it('should return Thai label for high', () => {
      expect(Helpers.getPriorityLabel('high')).toBe('สูง');
    });
  });

  describe('generateId', () => {
    it('should generate a non-empty string', () => {
      expect(Helpers.generateId().length).toBeGreaterThan(0);
    });
  });
});
