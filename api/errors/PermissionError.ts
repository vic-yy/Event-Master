import { ErrorMessages } from './ErrorMessages';
import { NotAuthorizedError } from './NotAuthorizedError';

export class PermissionError extends NotAuthorizedError {
  constructor(messageKey: keyof typeof ErrorMessages.PermissionError) {
    super('notAuthorized');
    this.name = 'PermissionError';
  }
}
