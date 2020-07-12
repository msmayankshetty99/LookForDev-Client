import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): any {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`http://localhost:5000/public/signin`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data.user)); 
                localStorage.setItem('token', user.data.accessToken); // NEVER STRINGIFY
                console.log(localStorage.getItem('user'));
                this.userSubject.next(user);
                //this.router.navigate(['/company']);//
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.userSubject.next(null);
        this.router.navigate(['/signin']);
    } 
}