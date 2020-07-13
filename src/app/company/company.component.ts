import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  comp_details: any;
  comp_name: string;
  comp_des: string;
  comp_id: any;

  user_name: string;
  user_email: string;
  user_dob: Date;
  user_gender: boolean;

  gigs: any;
  gigForm: FormGroup;
  gigSubmitted = false;

  category: any;
  constructor(
    private api: ConfigService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.gigForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      budget: ['', [Validators.required]],
      category:['', [Validators.required]]
    });

    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      user_id: user.id,
    }

    this.api.getCategory().subscribe(response => {
      console.log(response.data.category);
      this.category = response.data.category;
    }, error => {
      console.log('Error', error);
    })

    this.api.compDetails(data).subscribe(response => {
      this.comp_details = response.data.comp;
      this.comp_name = this.comp_details.comp_name;
      this.comp_des = this.comp_details.des;
      this.comp_id = this.comp_details.id;
      console.log(response.data.comp);

      this.user_name = user.full_name;
      this.user_email = user.email;
      this.user_dob = user.dob;
      this.user_gender = user.gender;

      var company = { comp_id: this.comp_id }
      this.api.getCompGigs(company).subscribe(response => {
        //console.log(response);
        this.gigs = response.data;
        console.log(this.gigs);
      }, error => {
        console.log('Error', error);
      })
    }, error => {
      console.log('Error', error);
    })
  }

  onAddGig() {
    this.gigSubmitted = true;
    var gigdata = {
      title: this.gigForm.value.title,
      budget: this.gigForm.value.budget,
      desc: this.gigForm.value.description,
      comp_id: this.comp_details.id,
      category_id:this.gigForm.value.category
    }
    this.api.addGigs(gigdata).subscribe(response => {
      console.log('Response', response);
      alert('Successfully added gig!');
    }, error => {
      console.log('Error', error);
    })
  };
  
}
