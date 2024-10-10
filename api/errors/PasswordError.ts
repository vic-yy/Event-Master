import { ErrorMessages } from './ErrorMessages';

export class PasswordError extends Error {
  constructor(messageKey: keyof typeof ErrorMessages.PasswordError) {
    super(ErrorMessages.PasswordError[messageKey]);
    this.name = 'PasswordError';
  }
}