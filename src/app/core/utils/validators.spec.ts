import { FormControl, FormGroup } from '@angular/forms';
import { AppValidators } from './validators';

describe('AppValidators', () => {
  describe('email', () => {
    it('should return null for valid email', () => {
      const control = new FormControl('test@example.com');
      const result = AppValidators.email()(control);
      expect(result).toBeNull();
    });

    it('should return error for invalid email', () => {
      const control = new FormControl('invalid-email');
      const result = AppValidators.email()(control);
      expect(result).toEqual({ email: true });
    });

    it('should return null for empty value', () => {
      const control = new FormControl('');
      const result = AppValidators.email()(control);
      expect(result).toBeNull();
    });
  });

  describe('phoneNumber', () => {
    it('should return null for valid 10-digit phone', () => {
      const control = new FormControl('0812345678');
      expect(AppValidators.phoneNumber()(control)).toBeNull();
    });

    it('should return error for invalid phone', () => {
      const control = new FormControl('123');
      expect(AppValidators.phoneNumber()(control)).toEqual({ phone: true });
    });
  });

  describe('passwordStrength', () => {
    it('should return null for strong password', () => {
      const control = new FormControl('Test@1234');
      expect(AppValidators.passwordStrength()(control)).toBeNull();
    });

    it('should return error for weak password', () => {
      const control = new FormControl('weak');
      expect(AppValidators.passwordStrength()(control)).toEqual({ passwordStrength: true });
    });
  });

  describe('match', () => {
    it('should set mustMatch error when passwords do not match', () => {
      const form = new FormGroup({
        password: new FormControl('Test@1234'),
        confirmPassword: new FormControl('Different@123'),
      });
      AppValidators.match('password', 'confirmPassword')(form);
      expect(form.get('confirmPassword')?.errors).toEqual({ mustMatch: true });
    });

    it('should clear error when passwords match', () => {
      const form = new FormGroup({
        password: new FormControl('Test@1234'),
        confirmPassword: new FormControl('Test@1234'),
      });
      AppValidators.match('password', 'confirmPassword')(form);
      expect(form.get('confirmPassword')?.errors).toBeNull();
    });
  });
});
