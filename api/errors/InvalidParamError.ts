import { ErrorMessages } from './ErrorMessages';

export class InvalidParamError extends Error {
  constructor(messageKey: keyof typeof ErrorMessages.InvalidParamError, param: string) {
    super();
    const errorMessage = ErrorMessages.InvalidParamError[messageKey](param);
    this.name = 'InvalidParamError';
  }
}
