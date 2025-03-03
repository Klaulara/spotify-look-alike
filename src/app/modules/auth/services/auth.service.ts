import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  sendCredentials(email: string, password: string): void {
    console.log('Email: ', email);
    console.log('Password: ', password);
  }
}
