import { Component } from '@angular/core';
import { AuthenticationService } from './services/auth.services';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lookfordev-client';

  constructor(
    private auth: AuthenticationService,
    private router: Router,
  ) { }
    
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    //this.userSubject.next(null);
    this.router.navigate(['/signin']);
  } 
  loggedIn()
  {
    return !!localStorage.getItem('token');
  }
}
