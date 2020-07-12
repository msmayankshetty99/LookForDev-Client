import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {
 
  dev_details: any;
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
      this.category_id = this.dev_details.category_id;
      var dev = { category_id:this.category_id }
      this.api.getDevGigs(dev).subscribe(response => {
        console.log(response);
      }, error => {
        console.log('Error', error);
      })
    }, error => {
      console.log('Error', error);
    })
  }
}
