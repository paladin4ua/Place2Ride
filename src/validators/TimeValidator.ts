import { FormControl } from '@angular/forms';
import * as moment from 'moment';

export class TimeValidator {

  private static tryParse(input: string) : number {

    let parsed = moment(input, 'HH:mm');
    if (parsed.isValid()) {
      return parsed.utc().valueOf();
    }

    return null;
  }

  static isValid(control: FormControl): any {
    if (!TimeValidator.tryParse(control.value)) {
      return {
        invalidTime : true
      }
    }
    return null;
  }

  static parse(input: string) : number {
    let result = TimeValidator.tryParse(input);
    if (!result) {
      throw new Error('Invalid time format');
    }
    return result;
  }

}
