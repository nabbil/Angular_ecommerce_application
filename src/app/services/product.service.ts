import { Injectable,Inject, forwardRef } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { ProdInterface } from '../products/prod-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  itemRef : any;

  constructor(@Inject(forwardRef(() => AngularFireDatabase))private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product)
  }

  getAll() { 
    this.itemRef =  this.db.list('/products').snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
    return this.itemRef;
  }

}
