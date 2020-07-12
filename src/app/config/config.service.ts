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

// Commented as we're using login() from auth.services.ts
// ======================================================
//   loginUsers(data) {
//      var header = new HttpHeaders({
//       'Content-Type': 'application/json', 
//       'Access-Control-Allow-Origin' :  '*' }
//      );
//       try
//       {
//          return this.http.post('http://localhost:5000/login', data);
//       }
//       catch(err)
//       {
//          return err;
//       }
//   }

  registerUsers(data) {
    var header = new HttpHeaders({
       'Content-Type': 'application/json', 
       'Access-Control-Allow-Origin' :  '*' }
       );
       try
       {
          return this.http.post('http://localhost:5000/public/register', data);
       }
       catch(err)
       {
          return err;
       }
  }

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

 compDetails(data) {
   const token = localStorage.getItem('token');
   var header = new HttpHeaders({
      'Authorization': 'Bearer ' + token, 
      //'Content-Type': 'application/json', 
      //'Access-Control-Allow-Origin' :  '*' 
      });
      console.log('header passed', header); 
      try
      {
         return this.http.post('http://localhost:5000/private/compDetails', data, {
            headers: header,
         }); // SHOULD BE PRIVATE        
      }
      catch(err)
      {
         return err;
      }
   }

   devDetails(data) {
      const token = localStorage.getItem('token');
      var header = new HttpHeaders({
         'Authorization': 'Bearer ' + token, 
         //'Content-Type': 'application/json', 
         //'Access-Control-Allow-Origin' :  '*' 
         });
         console.log('header passed', header); 
         try
         {
            return this.http.post('http://localhost:5000/private/devDetails', data, {
               headers: header,
            }); // SHOULD BE PRIVATE        
         }
         catch(err)
         {
            return err;
         }
      }
   

   addGigs(data) {
      const token = localStorage.getItem('token');
      var header = new HttpHeaders({
         'Authorization': 'Bearer ' + token, 
         'Content-Type': 'application/json', 
         'Access-Control-Allow-Origin' :  '*' 
         });
         console.log('header passed', header); 
         try
         {
            return this.http.post('http://localhost:5000/private/addGigs', data, {
               headers: header,
            }); // SHOULD BE PRIVATE        
         }
         catch(err)
         {
            return err;
         }
      }
      getCompGigs(data) {
         const token = localStorage.getItem('token');
         var header = new HttpHeaders({
            'Authorization': 'Bearer ' + token, 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin' :  '*' 
            });
            console.log('header passed', header); 
            try
            {
               return this.http.post('http://localhost:5000/private/getCompGigs', data, {
                  headers: header,
               }); // SHOULD BE PRIVATE        
            }
            catch(err)
            {
               return err;
            }
         }
         getDevGigs(data) {
            const token = localStorage.getItem('token');
            var header = new HttpHeaders({
               'Authorization': 'Bearer ' + token, 
               'Content-Type': 'application/json', 
               'Access-Control-Allow-Origin' :  '*' 
               });
               console.log('header passed', header); 
               try
               {
                  return this.http.post('http://localhost:5000/private/getDevGigs', data, {
                     headers: header,
                  }); // SHOULD BE PRIVATE        
               }
               catch(err)
               {
                  return err;
               }
            }
}
