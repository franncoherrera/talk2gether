import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SesionService {

  redirectUrl: string;

  // Log In Event dispatcher
  private announceSource = new Subject<string>();
  // For login subscribers.
  announced$ = this.announceSource.asObservable();

  constructor(private http: HttpClient) {
    this.redirectUrl = '';
  }


  /**
   * Clear all the session data stored in the browser and notifies session listening components.
   */
  clearLocalSession() {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
    
  }

  /**
   * Returns the local stored session obtained by the last "login" action.
   * @returns {any}
   */
  getCurrentSesion() {
    return JSON.parse(localStorage.getItem('currentSession'));
  }

  /**
   * Return the local stored session state obtained by the last "login" action.
   * @returns {boolean}
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }


  public startLocalSession(token: any) {
    if (token) {
      
      localStorage.setItem('currentSession', JSON.stringify(token));
    }
    if (token !== undefined) {
      localStorage.setItem('isLoggedIn', 'true');
    }
  }
}
