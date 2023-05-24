import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface User {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})





export class LoginComponent implements OnInit {
  loginObj: User = {
    userName: '',
    password: '',
  };

  @ViewChild('wrongCredentialsModal', { static: false }) wrongCredentialsModal!: TemplateRef<any>;

  showWrongCredentialsModal: boolean = false;

  formSubmitted: boolean = false;

  showFormError(): boolean {
    return !this.loginObj.userName && !this.loginObj.password;
  }

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void { }

  onLogin(): void {
    this.formSubmitted = true;
  
    if (!this.loginObj || !this.loginObj.userName || !this.loginObj.password) {
      console.log('Invalid credentials!');
      return;
    }
  
    const enteredUsername = this.loginObj.userName.trim();
    const enteredPassword = this.loginObj.password;
    const userList: string | null = localStorage.getItem('userList');
    const parsedUserList: User[] = userList ? JSON.parse(userList) : [];
    let matchingUser: User | undefined;
    let isWrongCredentials: boolean = true;
  
    for (const user of parsedUserList) {
      if (
        user.userName &&
        user.userName.toLowerCase() === enteredUsername.toLowerCase() &&
        user.password.toLowerCase() === enteredPassword.toLowerCase()
      ) {
        matchingUser = user;
        isWrongCredentials = false;
        break;
      }
    }
  
    console.log('Matching User:', matchingUser);
  
    if (matchingUser) {
      console.log('Logged in successfully!');
      // Redirect to homepage or perform any other actions
    } else {
      console.log('Invalid credentials!');
      // Handle invalid credentials, display error message, etc.
      if (isWrongCredentials) {
        this.handleWrongCredentials();
      }
    }
  }

  openWrongCredentialsModal(): void {
    this.modalService.open(this.wrongCredentialsModal, { centered: true });
  }

  closeWrongCredentialsModal(): void {
    this.modalService.dismissAll();
  }

  handleWrongCredentials(): void {
    this.openWrongCredentialsModal();
  }
}
