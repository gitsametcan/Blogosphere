import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }

  setWhichCategory(data: number){
    localStorage.setItem('categoryID',data.toString());
  }

  getWhichCategory(){
    return Number(localStorage.getItem('categoryID'));
  }
}
