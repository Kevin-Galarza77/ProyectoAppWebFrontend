import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  public car: any [] = [];

  constructor() { 

  }



  getCar(){
    return this.car;
  }

  setCar(car:any){
    this.car = car;
  }

  

}
