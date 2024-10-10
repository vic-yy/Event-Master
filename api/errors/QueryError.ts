import { ErrorMessages } from './ErrorMessages';

export class QueryError extends Error {
  constructor(messageKey: keyof typeof ErrorMessages.QueryError) {
    super(ErrorMessages.QueryError[messageKey]);
    this.name = 'QueryError';
  }
}
