import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { passValidator } from './validator';
import { ConfigService } from '../config/config.service';
import { AuthenticationService } from '../services/auth.services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  devForm: FormGroup;
  compForm: FormGroup;
  regSubmitted = false;
  logSubmitted = false;
  category: any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private api: ConfigService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        name:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(8)]],
        repassword:['',[Validators.required,passValidator]],
        dob:[''],
        gender:[''],
        role:['']
    });
    this.loginForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(8)]]
    });
    this.devForm = this.formBuilder.group({
        des:['',Validators.required],
        achievement:['',Validators.required],
        experience:['',Validators.required],
        category:['',Validators.required],
        linkedin:[''],
        facebook:[''],
        twitter:['']
    });
    this.compForm = this.formBuilder.group({
      comp_name:['',Validators.required],
      des:['',Validators.required],
    });

    this.api.getCategory().subscribe(response => {
      console.log(response.data.category);
      this.category = response.data.category;
    }, error => {
      console.log('Error', error);
    })
  }
  onRegister(){
    var userdata = { 
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      full_name: this.registerForm.value.name,
      gender: this.registerForm.value.gender,
      role: this.registerForm.value.role,
      dob: this.registerForm.value.dob,
    }
    this.regSubmitted = true;
    console.log('Register button clicked');
    console.log('Value', this.registerForm.value);

    //Basic User Registration
    this.api.registerUsers(userdata).subscribe(response => {
      console.log('Response', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      //Check For Role
      if(response.data.role == "0")
      {
        //Dev Regisrtatiom
        var devdata = {
          user_id: response.data.id,
          des: this.devForm.value.des,
          achievement: this.devForm.value.achievement,
          experience: this.devForm.value.experience,
          linkedin_link: this.devForm.value.linkedin,
          twitter_link: this.devForm.value.twitter,
          facebook_link: this.devForm.value.facebook,
          category_id: this.devForm.value.category,
        }
        this.api.registerDev(devdata).subscribe(response => {
          console.log('Response', response);
          alert('Successfully Registered!');
          localStorage.setItem('token', response.data.accessToken);
          this.router.navigate(['/dev']);
        }, error => {
          console.log('Error', error);
          alert('Error Encountered. Please try again.');
        });
      }
      else
      {
        //Comp registration
        var compdata = {
          user_id: response.data.id,
          comp_name:this.compForm.value.comp_name,
          des: this.compForm.value.des,
        }
        this.api.registerComp(compdata).subscribe(response => {
          console.log('Response', response);
          alert('Successfully Registered!');
          localStorage.setItem('token', response.data.accessToken);
          this.router.navigate(['/company']);
        }, error => {
          console.log('Error', error);
          alert('Error Encountered. Please try again.');
        });
      }
    }, error => {
      console.log('Errors', error);
    });
  }

  //Login Component
  onLogin() {
    // var logindata = {
    //   email: this.loginForm.value.email,
    //   password: this.loginForm.value.password,
    // }
    this.logSubmitted = true;
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      data => {
        console.log('Login Successful!');
        this.router.navigate(['/home']);
      }
    );
  
    // 
    // this.api.loginUsers(logindata).subscribe(response => {
    //   console.log('Response', response);
    // }, error => {
    //   console.log('Error', error);
    // });
    // console.log('Login button clicked');
  }
}
