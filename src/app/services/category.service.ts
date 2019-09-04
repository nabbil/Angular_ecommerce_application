import { Injectable, Inject,forwardRef } from '@angular/core';
import { AngularFireDatabase, } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(@Inject(forwardRef(() => AngularFireDatabase))private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories').valueChanges();
  }
}
