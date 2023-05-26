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

  setWhichContent(data: number){
    localStorage.setItem('contentID', data.toString());
  }

  getWhichContent(){
    return Number(localStorage.getItem('contentID'));
  }
}
