import { CartProduct } from 'src/app/viewModels/cart-product';
import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/icategory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  catList: ICategory[];
  orderedList:CartProduct[]=[]
  totalPrice:number = 0
  selectedCatID:number = 0
  constructor() { 
    this.catList=[{id:1, name:"Mobile"},{id:2, name:"Laptop"},{id:3, name:"TV"}];
  }

  ngOnInit(): void {
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
  }
}
