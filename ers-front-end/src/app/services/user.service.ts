import { Injectable } from '@angular/core';
// import { User } from '../interfaces/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let api_start = "http://localhost:8002/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user:User = {
  //   userId: 0,
  //   email: '',
  //   username: '',
  //   password: '',
  //   firstName: '',
  //   lastName: '',
  // }

  constructor(private http:HttpClient) { }

  validEmailCheck(email:String):Observable<boolean> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    }

    return this.http.get<boolean>
      (`${api_start}users/email=${email}`,
      httpOptions)
      .pipe(catchError((e) => {
        return throwError(() => new Error(e));
    }));
  }

  validUsernameCheck(username:String):Observable<boolean> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }

    return this.http.get<boolean>
      (`${api_start}users/user=${username}`,
      httpOptions)
      .pipe(catchError((e) => {
        return throwError(() => new Error(e));
    }));
  }
}
