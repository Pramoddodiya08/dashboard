import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggle = false;
  constructor(private apiService: AppServiceService, private router: Router) {}

  ngOnInit(): void {}
  toggleSide() {
    this.toggle = !this.toggle;
    this.apiService.toggle.next(this.toggle);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
