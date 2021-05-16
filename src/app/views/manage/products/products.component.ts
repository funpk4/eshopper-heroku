import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @ViewChild('successModal') public successModal: ModalDirective;


  constructor() { }

  ngOnInit(): void {
  }
  successModal1()
  {
    this.successModal.show()
  }

}
