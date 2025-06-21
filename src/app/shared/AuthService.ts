import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://localhost:5001/auth'; // ✅ Base API URL for all auth calls

  constructor(private http: HttpClient, private router: Router) {}

  async login(data: { username: string; password: string }): Promise<void> {
    try {
      const result = await this.http.post<{ token: string }>(`${this.baseUrl}/login`, data).toPromise();
      if (result?.token) {
        localStorage.setItem('token', result.token);
        this.router.navigate(['/dashboard']); // ✅ Redirect after login (optional)
      }
    } catch (err) {
      alert('Login failed. Please check your credentials.');
      console.error(err);
    }
  }

  async register(data: any): Promise<boolean> {
    try {
      await this.http.post(`${this.baseUrl}/register`, data).toPromise();
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    }
  }
}
