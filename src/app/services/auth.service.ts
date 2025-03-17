import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface UserData {
  name: string;
  email: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://reqres.in/api/login";
  private currentUser = new BehaviorSubject<UserData | null>(null);
  currentUser$ = this.currentUser.asObservable();
  constructor(private http: HttpClient) { 
  }
  
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(user:{name:string; email:string; password:string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`,{
      email: user.email,
      password: user.password
    }).pipe(
      tap(response => {
        const userData: UserData= {
          name: user.name,
          email: user.email
        };
        this.currentUser.next(userData);
      })
    );
  }
}
