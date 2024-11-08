import { ErrorMessages } from './ErrorMessages';

export class NotAuthorizedError extends Error {
  constructor(messageKey: keyof typeof ErrorMessages.NotAuthorizedError, param: string) {
    super(ErrorMessages.NotAuthorizedError[messageKey](param));
    this.name = 'NotAuthorizedError';
  }
}
