import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { urlencoded } from 'body-parser';
import { RequestService } from '../request.service';
import { response } from 'express';

interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
  userType: string;
  blocked: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObj: User = {
    userId: 0,
    username: '',
    email: '',
    password: '',
    userType: '',
    blocked: 0
  };

  @ViewChild('wrongCredentialsModal', { static: false }) wrongCredentialsModal!: TemplateRef<any>;

  showWrongCredentialsModal: boolean = false;
  formSubmitted: boolean = false;

  showFormError(): boolean {
    return !this.loginObj.username && !this.loginObj.password;
  }

  constructor(private router: Router, private modalService: NgbModal,private requestService: RequestService) {}

  onLogin(): void {
    this.formSubmitted = true;

    if (!this.loginObj || !this.loginObj.username || !this.loginObj.password) {
      console.log('Invalid credentials!');
      return;
    }

    const enteredUsername = this.loginObj.username.trim();
    const enteredPassword = this.loginObj.password;
    let matchingUser: User | undefined;
    let isWrongCredentials: boolean = true;

    for (const user of this.users) {
      if (
        user.username &&
        user.username.toLowerCase() === enteredUsername.toLowerCase() &&
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

  users: User[] = [];
  // getUsers(): void {
  //   fetch('http://localhost:5204/api/Users/GetAll')
  //     .then(response => response.json())
  //     .then(data => {
  //       this.users = data;
  //       console.log('Users:', this.users);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }

  getUsers(): void {
    this.requestService.sendRequest('api/Users/GetAll','GET')
      .then(response => {
        this.users = response;
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  ngOnInit(): void { 
    this.getUsers();
  }
}
