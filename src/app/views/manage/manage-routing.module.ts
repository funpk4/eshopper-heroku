import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import {ProductsComponent} from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: {
      title: 'Products'
    }
  },
  {
    path: 'categories',
    component: CategoryComponent,
    data: {
      title: 'Categories'
    }
  },
  {
    path: 'category-details',
    component: CategoryDetailsComponent,
    data: {
      title: 'Category Details'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
