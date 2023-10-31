import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ConfigApi } from 'src/app/services/config-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contactData: any;
  currentUser: any;
  constructor(private api: AppServiceService) {
    const jsonString: any = localStorage.getItem('setUser');

    const jsonObject = JSON.parse(jsonString);
    const body = jsonObject;
    const url = ConfigApi.URLS.PROFILE;

    this.api.callAPI(body, 'POST', url).subscribe((res) => {
      this.currentUser = res.data;
    });
  }

  ngOnInit(): void {
    const url = ConfigApi.URLS.CONTACT;
    this.api.callAPI({}, 'GET', url).subscribe((res: any) => {
      this.contactData = res.data;
    });
  }
}
