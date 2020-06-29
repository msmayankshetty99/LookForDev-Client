import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { passValidator } from './validator';
import { ConfigService } from '../config/config.service';

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

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: ConfigService,
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
        linkedin:[''],
        facebook:[''],
        twitter:['']
    });
    this.compForm = this.formBuilder.group({
      comp_name:['',Validators.required],
      des:['',Validators.required],
    });
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

   

    var compdata = {


    }

    this.regSubmitted = true;
    console.log('Register button clicked');
    console.log('Value', this.registerForm.value);
    //basic user registration
    this.api.registerUsers(userdata).subscribe(response => {
      console.log('Response', response);
      //check for role
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
        }
        this.api.registerDev(devdata).subscribe(response => {
          console.log('Response', response);
        }, error => {
          console.log('Error', error);
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
        }, error => {
          console.log('Error', error);
        });
      }
    }, error => {
      console.log('Errors', error);
    });
  }
  onLogin(){
    this.logSubmitted = true;
    console.log('Login button clicked');
  }
}
