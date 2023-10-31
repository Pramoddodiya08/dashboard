import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ConfigApi } from 'src/app/services/config-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  errormsg: string = '';
  error: boolean = false;
  toster: boolean = true;
  tostermsg: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: AppServiceService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const body = this.loginForm.value;
    const url = ConfigApi.URLS.LOGIN;
    this.api.callAPI(body, 'POST', url).subscribe((res) => {
      if (!res.success) {
        this.toastr.error(res.message, '', {
          timeOut: 2000,
        });
      } else {
        const userdata = JSON.stringify(res.data);
        this.toastr.success(res.message, '', {
          timeOut: 2000,
        });
        localStorage.setItem('setUser', userdata);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      }
    });
  }
  get f() {
    return this.loginForm.controls;
  }
}
