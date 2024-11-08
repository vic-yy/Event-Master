import { ErrorMessages } from './ErrorMessages';

export class TokenError extends Error {
  constructor(messageKey: keyof typeof ErrorMessages.TokenError) {
    super(ErrorMessages.TokenError[messageKey]);
    this.name = 'TokenError';
  }
}
