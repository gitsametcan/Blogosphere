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
  getCommentByContent(){
    return Number(localStorage.getItem('commentID'));
  }

  setCommentByContent(data: number){
    localStorage.setItem('commentID', data.toString())
  }
  getContentCount(){
    return Number(localStorage.getItem('contentCount'));
  }

  setContentCount(count: number){
    localStorage.setItem('contentCount', count.toString());
  }

  getListPriority(){
    return localStorage.getItem('priority');
  }

  setListPriority(value:string){
    localStorage.setItem('priority',value);
  }

  getWhichPage(){
    return localStorage.getItem('whichPage');
  }

  setCurrentUserType(value:string){
    localStorage.setItem('currentId', value);
  }

  getCurrentUSerType(){
    return localStorage.getItem('currentId');
  }

  setWhichPage(value:string){
    localStorage.setItem('whichPage',value);
  }

  setLogUserId(id:Number){
    localStorage.setItem('logId', id.toString());
  }

  getLogUserId():Number{
    return Number(localStorage.getItem('logId'));
  }

  setOnUserId(id:Number){
    localStorage.setItem('onId', id.toString());
  }

  getOnUserId():Number{
    return Number(localStorage.getItem('onId'));
  }


}
