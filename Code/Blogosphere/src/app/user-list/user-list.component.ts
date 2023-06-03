import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';



interface User{
  userId: number,
  userName: string,
  email: string,
  password: string,
  blocked: number,
  userType: string
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  public numberOfContents =  this.shared.getUserCount();
  public numberOfContentsInPerPage= Math.ceil(this.numberOfContents/10)>7 ? Math.ceil(this.numberOfContents/7) : 10;
  public selectedPage=1;

  enteredSearchValue: string = '';

  constructor(private requestService: RequestService, private shared:SharedService, private router:Router){}

  users : User[] = [];

  getAllUser():void {
    this.requestService.sendRequest('api/Users/GetAll','GET')
    .then(response => {
      this.users = response.data;
      console.log(this.users)
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getAllUserCount():void {
    this.requestService.sendRequest('api/Users/GetAllCount','GET')
    .then(response => {
      this.shared.setUserCount(response.data);
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }




  getAllUserWithPaging(pageNumber: number):void {
    this.requestService.sendRequest('api/Users/GetAllAlphabeticallyWithPages?PageSize='+this.numberOfContentsInPerPage+'&PageNumber='+pageNumber,'GET')
    .then(response => {
      this.users = response.data;
      console.log(this.users)
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }


  get pageNumbers(): number[]{
    return Array(Math.ceil(this.numberOfContents/this.numberOfContentsInPerPage))
    .fill(0)
    .map((a,i)=>i+1)
  }

  changePage(index:number):void{
    this.selectedPage=index;
    this.ngOnInit();
  }

  invisiblePagination(statu:boolean):void{
    let paginationRow = <HTMLElement>document.getElementById("pagination-row") as HTMLDivElement;
    if(!statu){
      paginationRow.style.visibility="hidden";
    }else{
      paginationRow.style.visibility="visible";
    }
  }

  setOnUser(Id:Number){
    this.shared.setOnUserId(Id);
  }

  ngOnInit():void{
    if(!this.shared.getUserCount()){
      this.getAllUserCount();
    }
    this.invisiblePagination(true);
    this.getAllUserWithPaging(this.selectedPage-1);
    //this.getAllUser();
  }
}
