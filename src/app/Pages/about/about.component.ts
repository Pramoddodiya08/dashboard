import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PagingConfig } from 'src/app/Custom/module';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ConfigApi } from 'src/app/services/config-api';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  modalRef?: BsModalRef;
  submitted = false;
  contactForm!: FormGroup;
  contactData!: any;
  loading: boolean = false;
  editMode: boolean = false;
  editingItemId: any;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  pagingConfig: PagingConfig = {} as PagingConfig;
  limits: number[] = [2, 5, 10];
  detail: any;
  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private api: AppServiceService
  ) {
    this.contactForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      notes: ['', Validators.required],
      dob: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      status: ['active'],
    });
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems,
    };
  }
  ngOnInit() {
    this.loading = true;
    const url =
      ConfigApi.URLS.CONTACT +
      `?limit=${this.itemsPerPage}&page=${this.currentPage}`;

    this.api.callAPI({}, 'GET', url).subscribe((res: any) => {
      this.contactData = res.data;
      this.pagingConfig.totalItems = res.data.length;
      this.pagingConfig.currentPage = res.pagination.page;
      this.pagingConfig.totalItems = res.pagination.total;
    });
  }
  onTableDataChange(event: any) {
    const url =
      ConfigApi.URLS.CONTACT + `?limit=${this.itemsPerPage}&page=${event}`;
    this.api.callAPI({}, 'GET', url).subscribe((res: any) => {
      this.contactData = res.data;
      this.pagingConfig.totalItems = res.data.length;
      this.pagingConfig.currentPage = res.pagination.page;
      this.pagingConfig.totalItems = res.pagination.total;
    });
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
  }
  openModal(template: TemplateRef<any>, item: any, title: string) {
    console.log(item);

    if (title == 'editData') {
      this.editMode = true;
      this.editingItemId = item._id;
      // this.detail = Object.assign({}, item);
      this.contactForm.patchValue({
        firstname: item.firstname,
        lastname: item.lastname,
        email: item.email,
        contact: item.contact,
        address: item.address,
        notes: item.notes,
        dob: this.formatDate(item.dob),
        status: item.status,
      });
    } else if (title == 'addData') {
      console.log(title);
      this.editMode = false;
      this.contactForm.reset();
    }
    this.modalRef = this.modalService.show(template);
  }
  formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.loading = true;

    if (this.editingItemId) {
      const body = this.contactForm.value;
      const url = ConfigApi.URLS.CONTACT + `/${this.editingItemId}`;
      this.api.callAPI(body, 'PUT', url).subscribe((res) => {
        this.ngOnInit();
        this.modalRef?.hide();
        this.loading = false;
        this.editMode = false;
      });
    } else {
      const url = ConfigApi.URLS.CONTACT;
      const body = this.contactForm.value;
      this.api.callAPI(body, 'POST', url).subscribe((res) => {
        this.ngOnInit();
        this.loading = false;
        this.modalRef?.hide();
        this.editMode = false;
      });
    }

    this.editMode = false;
    this.editingItemId = '';
    this.submitted = false;
    this.contactForm.reset();
  }
  get f() {
    return this.contactForm.controls;
  }

  deleta(id: string) {
    const body = { id };
    const url = ConfigApi.URLS.CONTACT + `/${id}`;
    this.api.callAPI(body, 'DELETE', url).subscribe((res) => {
      this.ngOnInit();
      this.modalRef?.hide();
    });
  }
  searchText: string = '';
}
