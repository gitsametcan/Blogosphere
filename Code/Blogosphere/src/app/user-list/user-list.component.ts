import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';



interface User{
  userId: 0,
  userName: string,
  email: string,
  userType: string,
  activicy: boolean
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

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

  setOnUser(Id:Number){
    this.shared.setOnUserId(Id);
  }

  ngOnInit():void{
    this.getAllUser();
  }
}
