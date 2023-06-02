import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private loggedInUser: any;

  constructor() {}

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }
}
