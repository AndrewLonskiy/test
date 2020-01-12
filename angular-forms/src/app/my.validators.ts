import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/index";

export class MyValidators {

  static restrictedEmails(control: FormControl): { [key: string]: boolean } {
    if (['1@mail.ru', 'test@mail.ru'].includes(control.value)) {
      return {restrictedEmail: true}
    }
    return null

  }

  static unicEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise ( resolve  => {
      setTimeout(()=> {
        if (control.value === '111@gmail.com'){
          resolve({unicEmail: true})
        } else {
          resolve(null)
        }
      }, 1000)
    })

  }


}
