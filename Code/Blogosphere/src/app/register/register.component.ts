import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  @ViewChild('passwordErrorModal') passwordErrorModal!: ElementRef;
  @ViewChild('errorModal') errorModal!: ElementRef;
  @ViewChild('alreadyRegisteredModal') alreadyRegisteredModal!: ElementRef;
  
  signupObj: any = {
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  isSubmitted: boolean = false;
  isAlreadyRegistered: boolean = false;
  passwordMatchError: boolean = false;
  formFieldsError: boolean = false;
  modalRef: NgbModalRef | undefined;

  constructor(private modalService: NgbModal,private requestService: RequestService) {}

  onSignUp(): void {
    this.passwordMatchError = this.signupObj.password !== this.signupObj.passwordConfirmation;
    this.formFieldsError = this.isFormFieldEmpty();


    if (this.passwordMatchError) {
      this.openPasswordErrorModal();
      return;
    }
    if (this.formFieldsError) {
      this.openErrorModal();
      return;
    }

    // Prepare the user object for POST request
    const user = {
      userId: 0,
      userName: this.signupObj.userName,
      email: this.signupObj.email,
      password: this.signupObj.password,
      blocked: 0, // Default value
      userType: 'member' // Default value
    };

    const url = 'api/Users/GetAll';
    this.requestService.sendRequest(url, 'GET')
      .then(response => {
        // Check if user already exists
        const userList = response.data;
        const existingUser = userList.find((u: any) => u.email === user.email);
        if (existingUser) {
          // User already exists, show error modal
          this.isAlreadyRegistered = true;
          this.openErrorModal();
          return;
        }

      // Send the POST request to register the user
      const registerUrl = 'api/Users/RegisterUser';
      this.requestService.sendRequest(registerUrl, 'POST', user)
        .then(registerResponse => {
          console.log('User registration successful:', registerResponse);
          // Clear form fields after successful registration
          this.signupObj = {
            userName: '',
            email: '',
            password: '',
            passwordConfirmation: ''
          };
          this.isSubmitted = true; // Set the form submission status to true
        })
        .catch(registerError => {
          console.error('User registration failed:', registerError);
        });
    })
    .catch(error => {
      console.error('Error retrieving user list:', error);
    });

      /*
  
    // Retrieve existing user information list from local storage
    let userList = localStorage.getItem('userList');
    let parsedUserList = userList ? JSON.parse(userList) : [];

    // Push the new user information into the list
    parsedUserList.push(this.signupObj);
    // Store the updated user information list in local storage
    localStorage.setItem('userList', JSON.stringify(parsedUserList));
    // Clear form fields after successful registration
    this.signupObj = {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };

    this.isSubmitted = true; // Set the form submission status to true*/
  }

  openPasswordErrorModal(): void {
    if (this.passwordErrorModal) {
      this.modalRef = this.modalService.open(this.passwordErrorModal, { ariaLabelledBy: 'passwordErrorModalTitle' });
    }
  }

  openAlreadyRegisteredModal(): void {
    if (this.alreadyRegisteredModal) {
      this.modalRef = this.modalService.open(this.alreadyRegisteredModal, { ariaLabelledBy: 'alreadyRegisteredModalTitle' });
    }
  }

  openErrorModal(): void {
    if (this.isAlreadyRegistered) {
      this.openAlreadyRegisteredModal();
    } else if (this.errorModal) {
      this.modalRef = this.modalService.open(this.errorModal, { ariaLabelledBy: 'errorModalTitle' });
    }
  } 
  closeErrorModal(): void {
    if (this.modalRef) {
      this.modalRef.dismiss();
      this.modalRef = undefined;
    }
  }

  closePasswordErrorModal(): void {
    if (this.modalRef) {
      this.modalRef.dismiss();
      this.modalRef = undefined;
    }
  }
  closeAlreadyRegisteredModal(): void {
    if (this.modalRef) {
      this.modalRef.dismiss();
      this.modalRef = undefined;
    }
  }
  onPasswordConfirmationInput(): void {
    this.passwordMatchError = this.signupObj.password !== this.signupObj.passwordConfirmation;
  }
  isFormFieldEmpty(): boolean {
    return (
      !this.signupObj.userName ||
      !this.signupObj.email ||
      !this.signupObj.password ||
      !this.signupObj.passwordConfirmation
    );
  }
}
