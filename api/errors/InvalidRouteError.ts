import { ErrorMessages } from './ErrorMessages';

export class InvalidRouteError extends Error {
  constructor(messageKey: keyof typeof ErrorMessages.InvalidRouteError) {
    super(ErrorMessages.InvalidRouteError[messageKey]);
    this.name = 'InvalidRouteError';
  }
}
