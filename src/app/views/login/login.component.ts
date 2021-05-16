import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,FormGroup} from '@angular/forms'
import { ServiceService } from '../manage/service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  myForm:FormGroup;
  resData: any;
  errMsg;
  succMsg;
  userData: any;
  UData: any;
  status:any;
  istrue: any;
  fdata: any;
  constructor(
    private fb:FormBuilder,
    private service:ServiceService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router
    ) {}
  

  ngOnInit(): void {
    this.validate()
  }
  login(){
    this.spinner.show()
    this.fdata=this.myForm.getRawValue()

      this.service.login(this.fdata)
      .subscribe(res=>
        { 

            this.resData=res;
            if(this.resData.err==0)
            { 
              let user=this.fdata.email;
              console.log('data',user)
              this.service.fatchuser(user)
              .subscribe(res=>
                {
                  this.UData=res;
                  this.userData=res;
                  localStorage.setItem('user', JSON.stringify(this.UData.data));
                  localStorage.setItem('id',this.userData.data._id)
                  this.toastr.success('', 'Login Successfully');
                  this.router.navigate(['dashboard']);
                 
                 
                }) 



            }
            else{
              console.log('error')
              console.log('msg',this.resData.msg)
              this.toastr.error('', 'Email or Password Incorrect');

            }
            this.spinner.hide()
        })
        
        



  }
  validate()
  {
    this.myForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
  });
  }

}


