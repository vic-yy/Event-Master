import { ErrorMessages } from './ErrorMessages';

export class LoginError extends Error {
  constructor(messageKey: keyof typeof ErrorMessages.LoginError) {
    super(ErrorMessages.LoginError[messageKey]);
    this.name = 'LoginError';
  }
}
