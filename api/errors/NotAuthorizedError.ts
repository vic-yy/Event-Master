import { ErrorMessages } from './ErrorMessages';

export class NotAuthorizedError extends Error {
  constructor(messageKey: keyof typeof ErrorMessages.NotAuthorizedError) {
    super(ErrorMessages.NotAuthorizedError[messageKey]);
    this.name = 'NotAuthorizedError';
  }
}
