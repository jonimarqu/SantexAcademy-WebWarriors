import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import { volunterData } from '../models/dataForms.model';
import { coordinatorData } from '../models/dataForms.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private authToken: string | null = null;

  constructor(private http: HttpClient) {}

  registerVolunteer(userData: volunterData): Observable<any> {
    const url = `${this.apiUrl}/auth/users/register`;
    return this.http.post(url, userData);
  }

  registerCoordinator(userData: coordinatorData): Observable<any> {
    const url = `${this.apiUrl}/auth/org/register`;
    return this.http.post(url, userData);
  }

  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  getAuthToken() {
    return this.authToken || localStorage.getItem('authToken') || '';
  }

  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }
}
