import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ConfigApi } from 'src/app/services/config-api';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  currentUser: any;
  modalRef?: BsModalRef;
  profileForm!: FormGroup;
  isDisabled = true;
  constructor(
    private modalService: BsModalService,
    private api: AppServiceService,
    private formBuilder: FormBuilder,
    public toastr: ToastrService
  ) {
    this.profileForm = this.formBuilder.group({
      email: [''],
      mobile: [''],
      address: [''],
      designation: [''],
      goal: [''],
    });
  }

  ngOnInit(): void {
    const jsonString: any = localStorage.getItem('setUser');

    const jsonObject = JSON.parse(jsonString);
    const body = jsonObject;
    const url = ConfigApi.URLS.PROFILE;

    this.api.callAPI(body, 'POST', url).subscribe((res) => {
      this.currentUser = res.data;
      this.profileForm.patchValue({
        email: this.currentUser.email,
        mobile: this.currentUser.mobile,
        address: this.currentUser.address,
        designation: this.currentUser.designation,
        goal: this.currentUser.goal,
      });
    });
  }
  openModal(template: TemplateRef<any>, user: any) {
    this.profileForm.patchValue({
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      designation: user.designation,
      goal: user.goal,
    });
    this.modalRef = this.modalService.show(template);
  }
  onSubmit() {
    const body = this.profileForm.value;
    const url = ConfigApi.URLS.PROFILE + `/${this.currentUser._id}`;
    this.api.callAPI(body, 'POST', url).subscribe((res) => {
      this.modalRef?.hide();
      if (res.success) {
        this.toastr.success(res.message, '', {
          timeOut: 2000,
        });
      } else {
        this.toastr.error(res.message, '', {
          timeOut: 2000,
        });
      }
      this.ngOnInit();
    });
  }
}
