import { Component } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { ServiceService } from '../manage/service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']

})
export class RegisterComponent {
myForm:FormGroup;
  resData: Object;
  constructor(
    private fb:FormBuilder,
    private service:ServiceService
  ) { }
  ngOnInit():void{
    this.validate()
  }
  register()
  {
    let fdata=this.myForm.getRawValue();
    this.service.register(fdata)
    .subscribe(res=>
      {
        this.resData=res; 

      })
  }
  validate()
  {
    this.myForm = this.fb.group({
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      gender: ["", Validators.required],
      age: ["", Validators.required],


  });
  }

}
