import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loading = false;
  loginForm!: FormGroup;
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  submitForm(evt: Event) {

    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    evt.preventDefault();
    this.loading = true;
    if (email != 'wendryl10000@gmail.com' || password != '123123') {
      setTimeout(() => {
        this.loading = false;
        return Swal.default.fire('Error!', 'Email or password invalid!', 'error');
      }, 3000)
    } else {
      setTimeout(() => {
        this.loading = false;
        return this._router.navigate(['/dashboard']);
      }, 3000)
    }
  }

}
