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
    var data = { 
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
    this.api.registerUsers(data).subscribe(response => {
      console.log('Response', response);
      //dev or comp here
    }, error => {
      console.log('Error', error);
    });
  }
  onLogin(){
    this.logSubmitted = true;
    console.log('Login button clicked');
  }
}
