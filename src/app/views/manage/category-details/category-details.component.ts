import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner'
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  resData: any;
  catData: any;
  myForm:FormGroup;
  id: any;
  cdata: any;
  category: any;
  succMsg: any;
  errMsg: any;
  subcatid: string;

  constructor(
    private spinner:NgxSpinnerService,
    private service:ServiceService,
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.subcatid=localStorage.getItem('subcat_id')
    console.log('subcatid',this.subcatid)
    this.id=localStorage.getItem('cat_id')
    this.fatchcat()
    this.fatchallcat()

      this.myForm = this.fb.group({
        subcategory: ["", Validators.required],
       
    });
  }
  fatchcat()
  {
    this.id=localStorage.getItem('cat_id')
    setTimeout(()=>
    {
      this.service.fatchcatbyid(this.id)
      .subscribe(res=>
        {
          this.resData=res;
          if(this.resData.err==0)
          {
            this.cdata=this.resData.data
            console.log('catdata', this.cdata)
            console.log('id',this.id)
          }
          this.spinner.hide
        })
    },50)
    
  }
  fatchallcat()
  {
    this.spinner.show()
    setTimeout(()=>
    {
      this.service.category(null)
      .subscribe(res=>
        {
          console.log(res);
          this.resData=res;
          if(this.resData.err==0)
          {
            this.catData=this.resData.data;
            this.category=this.catData
            
          }
        })
        this.spinner.hide()
    },5000)
    
  }
  catoption(event)
  {
    this.id=localStorage.setItem('cat_id',event.target.value)
  }
  editSubCat()
  {

      this.spinner.show()
      setTimeout(()=>
      { 
        this.id=localStorage.getItem('cat_id')
        console.log('subcatid',this.subcatid)

        let subcategory=this.myForm.controls.subcategory.value;

        this.service.editsubcat({subcategory:{'subcategory':subcategory,'sid':this.subcatid,},'id':this.id})
      .subscribe(res=>
        {
          // this.succMsg="Category Updated"
        })
        if(this.resData.err==0)
        {
          this.succMsg=this.resData.msg;
          console.log(this.succMsg);
        }
        else{
          this.errMsg=this.resData.msg 
          console.log(this.errMsg)

        }
        this.spinner.hide()
        this.fatchcat()
      },500)
  }
}
