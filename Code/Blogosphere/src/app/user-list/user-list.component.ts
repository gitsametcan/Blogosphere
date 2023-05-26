import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users=[
    {username: "ahmet", activicy: 0},
    {username: "mehmet", activicy: 1},
    {username: "cevdet", activicy: 0}
  ];
}
