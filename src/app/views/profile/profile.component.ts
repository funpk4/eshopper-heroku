import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../manage/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: any;
  user: any;
  resData: any;

  constructor(
    private service:ServiceService,
    private fb:FormBuilder
  ) { }
myForm:FormGroup
  ngOnInit(): void {
    this.myForm = this.fb.group({
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      age: ["", Validators.required],
      phone: ["", Validators.required],

  });
  }
  profile()
  {
    
        this.id=localStorage.getItem('id')
        console.log('userid',this.id)
        let fname=this.myForm.controls.fname.value;
        let lname=this.myForm.controls.lname.value;
        let age=this.myForm.controls.age.value;
        let phone=this.myForm.controls.phone.value;

      this.service.profile({'fname':fname,'lname':lname,'age':age,'phone':phone,'id':this.id})
      .subscribe(res=>
        {
          this.resData=res;
        })
}}
