// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductsComponent } from './products/products.component';
// Notifications Routing
import { ManageRoutingModule } from './manage-routing.module';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination';
import { CategoryDetailsComponent } from './category-details/category-details.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CategoryComponent,
    CategoryDetailsComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ManageRoutingModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule
  ]

})

export class ManageModule { }
