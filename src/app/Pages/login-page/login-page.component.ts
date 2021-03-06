import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Swal from 'sweetalert2';
import * as crypto from 'crypto-js';
import {UserService} from 'src/app/Services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loading = false;
  requestedLogin = false;
  loginForm!: FormGroup;
  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  validateForm() {
    if(this.loginForm.invalid)
      return false;

    return true;
  }

  submitForm(evt: Event) {

    this.requestedLogin = true;
    if(!this.validateForm())
      return false;

    const email = this.loginForm.controls.email.value;
    const password = crypto.SHA256(this.loginForm.controls.password.value).toString(crypto.enc.Base64);

    evt.preventDefault();
    this.loading = true;

    this._userService.auth(email, password)
      .subscribe(
        result => {
          this.loading = false;
          this.requestedLogin = false;
          localStorage.setItem('authToken', result.token);
          return this._router.navigate(['/dashboard']);
        },
        error => {
          this.loading = false;
          this.requestedLogin = false;

          if(error.status == 401) {
            return Swal.default.fire('Erro!', 'Email ou senha incorretos!', 'error');
          }
          return Swal.default.fire('Erro!', 'Sentimos muito. Um erro inesperado aconteceu', 'error');
        }
      )

    return;
  }

}
