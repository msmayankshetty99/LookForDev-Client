import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {
  dev_details: any;
  dev_des: string;
  dev_achievement: any;
  dev_resume: string;
  dev_exp: any;
  dev_linkedin: string;
  dev_twitter: string;
  dev_facebook: string;

  user_name: string;
  user_email: string;
  user_dob: Date;
  user_gender: boolean;

  gigs: any;
  category_id: any;
  constructor(
    private api: ConfigService,
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      user_id: user.id,
    }

    this.api.devDetails(data).subscribe(response =>{
      console.log(response);
      this.dev_details = response.data.dev;

      this.dev_des = this.dev_details.des;
      this.dev_achievement = this.dev_details.achievement;
      this.dev_resume = this.dev_details.resume_link;
      this.dev_exp = this.dev_details.experience;
      this.dev_linkedin = this.dev_details.linkedin_link;
      this.dev_twitter = this.dev_details.twitter_link;
      this.dev_facebook = this.dev_details.facebook_link;

      this.user_name = user.full_name;
      this.user_email = user.email;
      this.user_dob = user.dob;
      this.user_gender = user.gender;

      this.category_id = this.dev_details.category_id;
      var dev = { category_id:this.category_id }
      this.api.getDevGigs(dev).subscribe(response => {
        console.log(response);
        this.gigs = response.data;
      }, error => {
        console.log('Error', error);
      })
    }, error => {
      console.log('Error', error);
    })
  }
}
