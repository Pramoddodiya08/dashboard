import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ConfigApi } from 'src/app/services/config-api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signUpForm!: FormGroup;
  submitted = false;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: AppServiceService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }
    // if (
    //   this.signUpForm.value.username == 'user' &&
    //   this.signUpForm.value.password == 'user'
    // ) {
    //   localStorage.setItem('setLogin', 'true');
    //   this.router.navigate(['/home']);
    // }
    const body = this.signUpForm.value;
    const url = ConfigApi.URLS.SIGNUP;
    this.api.callAPI(body, 'POST', url).subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }
  get f() {
    return this.signUpForm.controls;
  }
}
