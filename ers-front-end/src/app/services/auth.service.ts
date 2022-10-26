import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';
let api_start = 'http://localhost:8002'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<User> {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-type': 'application/json',
      })
    }

    return this.http.post<User>(`${api_start}/auth/register/`,
      JSON.stringify(user),
      httpOptions)
      .pipe(catchError((e) =>{
        return throwError(() => new Error(e));
      }));
  }

  loginUser(username:String, password: String): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }

    return this.http.post<User>(`${api_start}/auth/login/`,
      JSON.stringify({username, password}),
      httpOptions)
      .pipe(catchError((e) =>{
        return throwError(() => new Error(e));
      }));
  }
}
