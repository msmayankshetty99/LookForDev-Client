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

  loginUsers(data) {
     var header = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin' :  '*' }
     );
      try
      {
         return this.http.post('http://localhost:5000/login', data);
      }
      catch(err)
      {
         return err;
      }
  }

//   registerUsers(data) {
//     var header = new HttpHeaders({
//        'Content-Type': 'application/json', 
//        'Access-Control-Allow-Origin' :  '*' }
//        );
//        try
//        {
//           return this.http.post('http://localhost:5000/register', data);
//        }
//        catch(err)
//        {
//           return err;
//        }
//   }
  registerDev(data) {
    var header = new HttpHeaders({
       'Content-Type': 'application/json', 
       'Access-Control-Allow-Origin' :  '*' }
       );
       try
       {
          return this.http.post('http://localhost:5000/public/registerDev', data);
       }
       catch(err)
       {
          return err;
       }
  }
  registerComp(data) {
   var header = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin' :  '*' }
      );
      try
      {
         return this.http.post('http://localhost:5000/public/registerComp', data);
      }
      catch(err)
      {
         return err;
      }
 }
}
