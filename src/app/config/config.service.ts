import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { 
  }

  registerUsers(data) {
    var header = new HttpHeaders({
       'Content-Type': 'application/json', 
       'Access-Control-Allow-Origin' :  '*' }
       );
      //  return this.http.post('localhost:5000/register', data, { headers: header });
      return this.http.get('localhost:5000/');
  }
}
