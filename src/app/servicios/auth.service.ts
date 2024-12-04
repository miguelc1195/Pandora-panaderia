import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private adminEmail = 'miguelam20@educastur.es';

  isLoggedIn(): boolean {
    return this.firebaseAuth.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.firebaseAuth.currentUser?.email === this.adminEmail;
  }

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(async (response) =>
      updateProfile(response.user, { displayName: username })
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password));
  }

  logout(): Observable<any> {
    return from(signOut(this.firebaseAuth));
  }

  getUserName(): string {
    return this.firebaseAuth.currentUser?.displayName || 'Usuario';
  }

  constructor() {}
}
