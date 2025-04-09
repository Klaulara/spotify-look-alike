import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router, private cookie: CookieService) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }
  sendLogin():  void {
    const { email, password } = this.formLogin.value;
    this.authService.sendCredentials(email, password).subscribe(
      (response) => {
        console.log(response);
        const { tokenSession, data } = response;
        this.cookie.set('token', tokenSession, 4, '/');
        console.log('por aqui paso')
        this.router.navigate(['/','tracks'])
      },
      (error) => {
        this.errorSession = true;
        console.error(error);
      }
    );
  }
}
