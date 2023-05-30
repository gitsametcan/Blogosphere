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

  setWhichTitleOrContent(data: any){
    localStorage.setItem('search',data);
  }

  getWhichTitleOrContent(){
    return localStorage.getItem('search');
  }


  setTrend(condition: number){
    localStorage.setItem('trend',condition.toString());
  }

  getTrend(){
    return Number(localStorage.getItem('trend'));
  }

  setHowList(choose:number){
    localStorage.setItem('how',choose.toString());
  }

  getHowList(){
    return Number(localStorage.getItem('how'));
  }

  setUserId(id:number){
    localStorage.setItem('id',id.toString());
  }

  getUserId(){
    return Number(localStorage.getItem('id'));
  }

}
