import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  comp_details: any;
  comp_name: string;
  comp_des: string;
 
  constructor(
    private api: ConfigService,
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      user_id: user.id,
    }
    this.api.compDetails(data).subscribe(response => {
      this.comp_details = response.data.comp;
      this.comp_name = this.comp_details.comp_name;
      this.comp_des = this.comp_details.des;
      console.log(response.data.comp);
    }, error => {
      console.log('Error', error);
    })
  }

  // getCompDetails() { ===================> UNUSED NOW
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const data = {
  //     user_id: user.id,
  //   }
  //   this.api.compDetails(data).subscribe(response => {
  //     console.log('Response', response);
  //     return response;
  //   }, error => {
  //     console.log('Error', error);
  //     return error;
  //   });
  // }
} 
