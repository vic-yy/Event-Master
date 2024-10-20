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
    if (body.email && !isEmailValid(body.email)) {
      throw new InvalidParamError('invalidFormat', 'email'); 
    }
    if (body.password && !isPasswordValid(body.password)) {
      throw new InvalidParamError('invalidFormat', 'password'); 
    }
}

// Valid Date
export function isValidDate(dateTimeString: string ) {
 
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

    if (!regex.test(dateTimeString)) {
        throw new InvalidParamError('invalidFormat', 'date');
    }
	const [datePart, timePart] = dateTimeString.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
	
	const date = new Date(year, month - 1, day, hours, minutes, seconds);

    const ok = (date.getFullYear() === year &&
           date.getMonth() === month - 1 &&
           date.getDate() === day &&
           date.getHours() === hours &&
           date.getMinutes() === minutes &&
           date.getSeconds() === seconds);

	if (!ok) new InvalidParamError('invalidFormat', 'date');
	return date;
} 