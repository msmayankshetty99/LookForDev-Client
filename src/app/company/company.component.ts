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
  gigForm: FormGroup;
  gigSubmitted = false;

  constructor(
    private api: ConfigService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.gigForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      budget: ['', [Validators.required]]
    });

    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      user_id: user.id,
    }

    this.api.compDetails(data).subscribe(response => {
      console.log(response.data.comp);
      this.comp_details = response.data.comp;
      this.comp_name = this.comp_details.comp_name;
      this.comp_des = this.comp_details.des;
      this.comp_id = this.comp_details.id;
      this.api.getCompGigs(4).subscribe(response => {
        console.log(response.data.comp);
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
    }
    this.api.addGigs(gigdata).subscribe(response => {
      console.log('Response', response);
      alert('Successfully added gig!');
    }, error => {
      console.log('Error', error);
    })
  };
}
