import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password));
  }

  constructor() {}
}
