import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "./my.validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // title = 'angular-forms';
  appState = 'on';

  form: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required, MyValidators.restrictedEmails],
        MyValidators.unicEmail),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      address: new FormGroup({
        country: new FormControl('ua'),
        city: new FormControl('', Validators.required)
      }),
      skills: new FormArray([])
    })
  }

  submit() {
    if (this.form.valid) {
      console.log('Form submitted', this.form)
      const formData = {...this.form.value}

      console.log('FormData:', formData)

      this.form.reset()
    }
  }

  setCapital() {
    const cityMap = {
      ru: 'Львов',
      ua:'Киев',
      by: 'Минск'
    }
    const cityKey = this.form.get('address').get('country').value
    const city = cityMap[cityKey]

console.log(city)

    this.form.patchValue({address:{city: city}})
  }

  addSkill() {
    const controls = new FormControl('', Validators.required);

    (<FormArray>this.form.get('skills')).push(controls)
  }

  handleChange() {
    console.log(this.appState)
  }
}
