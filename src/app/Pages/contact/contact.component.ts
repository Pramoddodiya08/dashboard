import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  submitted = false;
  contactForm!: FormGroup;
  map: any;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      notes: ['', Validators.required],
      contactnumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
    });
    // this.map = L.map('map').setView([51.505, -0.09], 13);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    // }).addTo(this.map);
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }

    this.contactForm.reset();
    this.submitted = false;
  }
  get f() {
    return this.contactForm.controls;
  }
}
