import { isEmailValid } from '../../utils/functions/isEmailValid';
import { InvalidParamError } from '../../errors/InvalidParamError';
import isPasswordValid from '../../utils/functions/isPasswordValid';


export function emptyInputValidator(body: any) {
    if (!body.email || body.email.trim() === '') {
      throw new InvalidParamError('missingParam', 'email'); 
    }
    if (!body.name || body.name.trim() === '') {
      throw new InvalidParamError('missingParam', 'name'); 
    }
    if (!body.password || body.password.trim() === '') {
      throw new InvalidParamError('missingParam', 'password'); 
        }
  }

export function invalidInputValidator(body: any) {
    if (!isEmailValid(body.email)) {
      throw new InvalidParamError('invalidFormat', 'email'); 
    }
    if (!isPasswordValid(body.password)) {
      throw new InvalidParamError('invalidFormat', 'password'); 
    }
}