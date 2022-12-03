import { CartProduct } from 'src/app/viewModels/cart-product';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/models/icategory';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  catList: ICategory[];
  orderedList:CartProduct[]=[];
  totalPrice:number = 0;
  selectedCatID:number = 0;
  @ViewChild(ProductListComponent) prdListComponent!:ProductListComponent
  constructor() { 
    this.catList=[{id:1, name:"Mobile"},{id:2, name:"Laptop"},{id:3, name:"TV"}];
  }

  ngOnInit(): void {
  };

  ngAfterViewInit(): void {
    
  }

  getCartProducts(cart:CartProduct[]){
    this.orderedList = cart;
    this.calcTotalPrice(this.orderedList);
  };
  
  calcTotalPrice(cart:CartProduct[]){
    this.totalPrice=0
    cart.forEach(item => {
      this.totalPrice+= (item.price * item.amount)
    });
  };

  itemCountChange(index:number, value:number){
    this.orderedList[index].amount = value
    this.calcTotalPrice(this.orderedList);
  };

  completeShop(){
    this.prdListComponent.productList.forEach(prd => {
      this.orderedList.forEach(ord => {
        if(prd.id == ord.id) prd.quantity -= ord.amount
      })
    })
  };

  removeItem(index:number){
    this.orderedList.splice(index, 1);
    this.calcTotalPrice(this.orderedList);
  }
}
