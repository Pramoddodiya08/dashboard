import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  newToggle!: boolean;
  constructor(private api: AppServiceService, private router: Router) {
    this.api.toggle.subscribe((res) => {
      this.newToggle = res;
    });
  }

  ngOnInit(): void {}
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
