import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { urlencoded } from 'body-parser';
import { RequestService } from '../request.service';
import { response } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from '../UserService';

interface Category{
  categoryId: 0,
  categoryTitle: string,
  categoryDescription: string,
}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {

    categoryObj: Category = {
    categoryId: 0,
    categoryTitle: '',
    categoryDescription: '',
  };

  enteredSearchValue: string = '';
  loggedInUser: any;
  userId: number = -1;

  selectWhichTypeHasPriority(type:string):void{
    this.shared.setWhichPage(type);
    window.location.reload();
  }

  changeCategory(ID:number): void{
    this.shared.setWhichCategory(ID);
    this.shared.setWhichTitleOrContent("");
    this.shared.setTrend(0);
  }

  listSearchedContents():void{
    this.shared.setWhichTitleOrContent(this.enteredSearchValue);
    window.location.reload();
  }

  listTrends():void{
    this.shared.setWhichCategory(0);
    this.shared.setTrend(1);
  }

  constructor(private shared: SharedService, private requestService: RequestService,private cookieService: CookieService,private router: Router,private userService: UserService){
  }
  categoriess: Category[] = [];
  
  getCategories():void {
    this.requestService.sendRequest('api/Categorys/GetAll','GET')
      .then(response => {
        this.categoriess = response.data;
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }


  ngOnInit(): void { 
      this.getCategories();
      const sessionKey = this.cookieService.get('sessionKey');    
      this.loggedInUser = this.retrieveUsername(sessionKey);

    }


    retrieveUsername(sessionKey: string): void {
      const url = `api/Sessions/FindUser?SessionKey=${sessionKey}`;
      this.requestService
        .sendRequest(url, 'GET')
        .then((response) => {
          if (response.success && response.data) {
            // Save the user information in the shared service
            this.userService.setLoggedInUser(response.data);
            this.loggedInUser = response.data.userName;
            this.userId = response.data.userId;
            this.shared.setLogUserId(response.data.userId);
            this.shared.setCurrentUserType(response.data.userType);
            this.shared.setOnUserId(response.data.userId);
          } else {
            console.error('Failed to retrieve user data:', response.message);
          }
        })
        .catch((err) => {
          console.error('Error:', err);
        });
    }

  @Output()
  searchTextChanged: EventEmitter<any>=new EventEmitter<any>();

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);
    console.log(this.enteredSearchValue);
  }

  logout(): void {
  // Get the session key from the cookie
  const sessionKey = this.cookieService.get('sessionKey');
  // Delete the session key from the cookie
  this.cookieService.delete('sessionKey');
  // Send a service request to delete the session from the database
  this.requestService
      .sendRequest(`api/Sessions/DeleteSession?SessionKey=${sessionKey}`, 'DELETE')
  this.router.navigate(['/login']) .then(() => {
    window.location.reload();
  });
  
  }
}
