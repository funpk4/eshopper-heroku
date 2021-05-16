import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../manage/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rowdata: any;
  data=[];
  row=[];
  id: any;
  fdata=[];
  constructor( private fb:FormBuilder, private service:ServiceService) { }
myForm:FormGroup;
resData:any;
childform:FormGroup;
  ngOnInit(): void {
    this.validate()
    this.childform=this.fb.group({
      id:["",Validators.required],
      tno:["",Validators.required],
      price:["",Validators.required]
    })
  } 
validate()
{
  this.myForm=this.fb.group({
    eventname:["",Validators.required],
    descevent:["",Validators.required],
    sdate:["",Validators.required],
    edate:["",Validators.required],
    organizer:["",Validators.required],
    
  })

}
postData()
{ 
    let rowdata=this.myForm.getRawValue();
    this.fdata.push(rowdata)
    console.log('pusheddata',this.fdata)
    this.service.post(this.fdata)
    .subscribe(res=>
      {
        this.resData=res;

       if(this.resData.err==0)
       {

      }
       else
       {

       }
      },err=>
      {
        console.log(err);
      } )
}
event()
{

 
  this.data.push(this.row);
console.log('row',this.data)
this.id=this.childform.controls.id.value;
this.data=[{'id':this.childform.controls.id.value, 'tno':this.childform.controls.tno.value, 'price':this.childform.controls.price.value}]
this.fdata.push(this.data)
console.log('fdata', this.fdata)
}
}
