import { Component, OnInit, Inject,forwardRef} from '@angular/core';

import {FormGroup, FormControl, Validators } from '@angular/forms';

import { CategoryService } from '../services/category.service'
import { ProductService } from '../services/product.service';

// Import for Post Service
import { HttpService } from '../services/http.service'

@Component({
  selector: 'app-create-prod',
  templateUrl: './create-prod.component.html',
  styleUrls: ['./create-prod.component.scss']
})
export class CreateProdComponent implements OnInit {

  createForm = new FormGroup({
    name : new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    photo: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    qty: new FormControl('',Validators.required),
    color_way: new FormControl('',Validators.required),
    category: new FormControl('')
  })

  categories$

  constructor( @Inject(forwardRef(() => HttpService))private httpPost:HttpService, 
    @Inject(forwardRef(() => CategoryService)) categoryService: CategoryService,
  private productService:ProductService) { 
    this.categories$ = categoryService.getCategories()
}

  onSubmit(){
    // Accept all info from form
    console.log(this.createForm.value)

    this.productService.create(this.createForm.value)

    // return this.httpPost.postProducts(this.createForm.value).subscribe( response => {
    //   console.log(response)
    // })
  }

  ngOnInit() {
  }

}
