import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { from } from 'rxjs';
import {FormBuilder, Validators,FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild('successModal2') public successModal2: ModalDirective;
  @ViewChild('successModal3') public successModal3: ModalDirective;

  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  @ViewChild('dangerModal2') public dangerModal2: ModalDirective;



  @Output() changed = new EventEmitter<boolean>();
  checked: boolean;
  myForm:FormGroup;
  imageName: any;
  resData: any;
  errMsg;
  succMsg;
  errImg: string;
  catData: any;
  p;
  id:any;
  catdata: any;
  cdata: any;
  subcat: any;
  subcatid: any;
  constructor(
    private fb:FormBuilder,
    private service:ServiceService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router
  ) {
    
   }
  

  ngOnInit(): void {

    // this.id =localStorage.getItem('cat_id')
    // this.service.fatchcatbyid(this.id)
    // .subscribe(res=>
    //   {
    //     console.log(res);

    //     this.resData=res;
    //     if(this.resData.err==0)
    //     {
    //       this.catdata=this.resData.data
    //       this.myForm.controls.category.patchValue(this.catdata.category);
    //     }
    //   })
    // this.pser.fatchcat()
    // .subscribe(res=>
    //   {
    //     console.log(res);
    //     this.resData=res;
    //     if(this.resData.err==0)
    //     {
    //       this.catData=this.resData.cdata;
    //     }
    //   })
    this.fatchcat()
    this.validate()
    
  }
  delcat(id)
  {
    setTimeout(()=>
    {
      this.service.fatchcatbyid(id)
      .subscribe(res=>
        {
          this.resData=res;
          if(this.resData.err==0)
          {
            this.cdata=this.resData.data
            this.id=this.resData.data._id
            localStorage.setItem('cat_id',this.id)
          }
  
        })
    },50)
    localStorage.setItem('cat_id',this.id)

    this.id=localStorage.getItem('cat_id')
    this.dangerModal.show()

   
  }
  suspendcat(id)
  {
    var id:any;
    localStorage.setItem('cat_id',id)
    this.id=localStorage.getItem('cat_id')
    this.dangerModal2.show()
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
  
        })
    },50)
   
  }
  activecat(id)
  {
    var id:any;
    localStorage.setItem('cat_id',id)
    this.id=localStorage.getItem('cat_id')
    this.successModal2.show()
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
  
        })
    },50)
   
  }
  // subcategory(id)
  // { this.spinner.show()
  //   setTimeout(()=>
  //   {
  //     var subcategory='praveen'
  //     let fdata=subcategory;
  //     this.service.subcategory(fdata, this.id)
  //     .subscribe(res=>
  //       {
  //         this.resData=res;
  //         this.fatchcat()
  //        if(this.resData.err==0)
  //        {
  //         this.toastr.success('Success', 'Category Added Successfully');
  //         this.succMsg=this.resData.msg
  
  //       }
  //        else
  //        {
  //         this.errMsg=this.resData.msg
  //         this.toastr.error('Error', 'Category Category Already Exist');
  //        }
  //       },err=>
  //       {
  //         console.log(err);
  //       } )
  //       this.myForm.reset();
  //       this.successModal.hide()
  //       this.spinner.hide()
  //   },5000)

      
  // }
  editcat(id)
  {
    this.id=id;
    console.log('id',this.id)
    localStorage.setItem('cat_id',id)
    this.successModal3.show()
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
  
        })
    },50)
      setTimeout(()=>
      {
        this.myForm.controls.category.patchValue(this.cdata.category);

      },500)

   
  }

  deleteCat(){
    this.spinner.show()
    console.log('deleteid',this.id)
      this.service.delcat(this.id)
    .subscribe(res=>
      {
        this.resData=res;
        localStorage.removeItem("cat_id")

      })
      this.dangerModal.hide()
      this.spinner.hide()
      this.fatchcat()
  }

  suspendCat()
  {
    this.spinner.show()
    let status='0'
      setTimeout(()=>
      {
        this.service.suspendCat({'status':status,'id':this.id})
      .subscribe(res=>
        {
          // this.succMsg="Category Updated"
        })
        if(this.resData.err==0)
        {
          
          this.dangerModal2.hide()
          this.succMsg=this.resData.msg
        }
        else{
          this.errMsg=this.resData.msg 
        }
        this.spinner.hide()
        this.fatchcat()
      },5000)
  }
  activeCat()
  {
    this.spinner.show()
    let status='1'
      setTimeout(()=>
      {
        this.service.suspendCat({'status':status,'id':this.id})
      .subscribe(res=>
        {
          // this.succMsg="Category Updated"
        })
        if(this.resData.err==0)
        {
          this.successModal2.hide()
          this.succMsg=this.resData.msg
        }
        else{
          this.errMsg=this.resData.msg 
        }
        this.spinner.hide()
        this.fatchcat()
      },5000)
  }
  successModalHide(){
    this.successModal3.hide()
    localStorage.removeItem('cat_id')
    this.myForm.controls.category.reset()

  }
  editCat()
  {
      this.spinner.show()
      setTimeout(()=>
      {
        let category=this.myForm.controls.category.value;
      this.service.editcat({'category':category,'id':this.id})
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
        this.successModalHide()
      },5000)
  }
  hidedangermodal()
  {
    this.dangerModal.hide()
    localStorage.removeItem("cat_id")
  }
  hidedangermodal2()
  {
    this.dangerModal2.hide()
    localStorage.removeItem("cat_id")
  }
  
pagechange()
{

  localStorage.setItem('page',this.p)
}
  validate()
  {
    this.myForm = this.fb.group({
      category: ["", Validators.required],
      image: ["", Validators.required],
      status: ["", Validators.required]
  });
  }
  fatchcat()
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
            
          }
        })
        this.spinner.hide()
    },50)
    
  }
  // post()
  // {
  //   if(this.imageName!=undefined)
  //   {
  //     let category=this.myForm.controls.category.value;
  //     let status=this.myForm.controls.status.value;
  //     let formData=new FormData();
  //     formData.append('category',category);
  //     formData.append('status',status);
  //     formData.append('attach',this.imageName);
  //     this.service.addcategory(formData)
  //       .subscribe(res=>
  //         {
  //           this.resData=res;
  //       if(this.resData.err==1)
  //       {
  //         this.errMsg=this.resData.msg;
  //       }
  //       else{
  //         this.succMsg=this.resData.msg;
  //       }
  //         })
  //   }
  //   else
  //   {
  //     this.errImg="Please Select an Image";
      
  //   }
  //   this.myForm.reset();
  // }
  // myImage(event)
  // {
  //   if(event.target.files.length>0)
  //   {
  //     this.imageName=event.target.files[0];
  //     console.log(this.imageName)
  //   }
  // }
  postCat()
  { this.spinner.show()
    setTimeout(()=>
    {
      let fdata=this.myForm.getRawValue();
      this.service.category(fdata)
      .subscribe(res=>
        {
          this.resData=res;
          this.fatchcat()
         if(this.resData.err==0)
         {
          this.toastr.success('Success', 'Category Added Successfully');
          this.succMsg=this.resData.msg
  
        }
         else
         {
          this.errMsg=this.resData.msg
          this.toastr.error('Error', 'Category Category Already Exist');
         }
        },err=>
        {
          console.log(err);
        } )
        this.myForm.reset();
        this.successModal.hide()
        this.spinner.hide()
    },5000)

      
  }
  catdetails()
  {
    this.router.navigate(['manage/category-details']);
  }
}


