import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  newToggle!: boolean;
  constructor(private api: AppServiceService) {
    this.api.toggle.subscribe((res) => {
      this.newToggle = res;
    });
  }
  ngOnInit(): void {}
}
