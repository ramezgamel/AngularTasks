import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IProduct } from 'src/app/models/iproduct';
import { CartProduct } from 'src/app/viewModels/cart-product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnChanges {
  productList: IProduct[];
  productListOfCat: IProduct[]=[];
  orderList: CartProduct[]=[];
  @Output() cartProducts:EventEmitter<CartProduct[]> = new EventEmitter<CartProduct[]>
  @Input() selectedCat:number=0;
  
  constructor() { 
    this.productList = [
      {id: 1, name: "Iphone 13", price: 15000, quantity: 12, categoryId: 1},
      {id: 2, name: "Iphone 14", price: 18000, quantity: 10, categoryId: 1},
      {id: 3, name: "Mac book 14", price: 28000, quantity: 0, categoryId: 2},
      {id: 4, name: "Dell 5559", price: 12000, quantity: 1, categoryId: 2},
      {id: 5, name: "LG 42 inch", price: 7000, quantity: 4, categoryId: 3},
      {id: 6, name: "LG 55 inch", price: 11000, quantity: 11, categoryId: 3}
    ];

  }
  ngOnChanges(): void {
    this.filterByCatID()
  };

  private filterByCatID(){
    if(this.selectedCat==0) 
      this.productListOfCat = this.productList
    else
      this.productListOfCat = this.productList.filter(prd => prd.categoryId == this.selectedCat)
  }

  buy(amount: number, price: number, name:string, id:number){
    const item = {name, price, amount, id};
    this.orderList.push(item);
    this.cartProducts.emit(this.orderList);
  };
}
