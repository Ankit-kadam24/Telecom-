import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { User } from '../models/user';
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id"> | undefined;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  register(user: Omit<User, "id">): Observable<User> {
    return this.http
      .post<User>(`${this.url}/register`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>("register"))
      );
  }

  login(
    name: Pick<User, "name">,
    password: Pick<User, "password">
  ): Observable<{
    token: string;
    userId: Pick<User, "id">;
  }> {
    return this.http
      .post(`${this.url}/login`, { name, password }, this.httpOptions)
      .pipe( 
        first(),
        tap((tokenObject: { token: string; userId: Pick<User, "id"> }) => {
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["posts"]);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, "id">;
          }>("login")
        )
      );

      
  }


}