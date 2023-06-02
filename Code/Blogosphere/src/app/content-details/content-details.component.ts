import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { urlencoded } from 'body-parser';
import { RequestService } from '../request.service';
import { response } from 'express';
import { UserService } from '../UserService';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface ContentDetail {
  contentId: 0,
  title: string,
  publishDate: string,
  content1: string,
  imagePath: string,
  authorId: 0,
  categoryId: 0,
  visibility: 0
}

interface Comment {
  commentId: 0,
  posterId: 0,
  contentId: 0,
  commentContent: string,
  publishDate: string

}

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css']
})
export class ContentDetailsComponent implements OnInit {

  constructor(private shared: SharedService, private requestService: RequestService, private userService: UserService, private cookieService: CookieService, private router: Router) { }

  contentObj: ContentDetail = {
    contentId: 0,
    title: '',
    publishDate: '',
    content1: '',
    imagePath: '',
    authorId: 0,
    categoryId: 0,
    visibility: 0
  };

  commentObj: Comment = {
    commentId: 0,
    posterId: 0,
    contentId: 0,
    commentContent: '',
    publishDate: ''
  };

  comments: Comment[] = [];

  content!: ContentDetail;

  loggedInUser: any;
  createdComment: any;

  getContentsByID(ID: number): void {
    this.requestService.sendRequest('api/Contents/GetById/' + ID, 'GET')
      .then(response => {
        this.content = response.data;
        this.getImage(this.content.imagePath, ID);
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  getCommentsByContentID(ID: number): void {
    this.requestService.sendRequest('api/Comments/GetByContent/' + ID, 'GET')
      .then(response => {
        this.comments = response.data;
        console.log(this.comments);
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  getImage(img: string, id: number): void {
    const url = 'http://localhost:5204/' + img;
    const options = {
      method: "GET"
    }
    fetch(url, options)
      .then(async response => {
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        let image = <HTMLElement>document.getElementById('content-detail-img') as HTMLImageElement;
        image.src = imageObjectURL;
      }).catch(error => {
        console.error('Error:', error);
      })
  }

  retrieveUsername(sessionKey: string): void {
    const url = `api/Sessions/FindUser?SessionKey=${sessionKey}`;
    this.requestService.sendRequest(url, 'GET')
      .then((response) => {
        if (response.success && response.data) {
          // Save the user information in the shared service
          this.userService.setLoggedInUser(response.data);
          this.loggedInUser = response.data
          console.log(this.loggedInUser.userType);
        } else {
          console.error('Failed to retrieve user data:', response.message);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  postComment(userId: number, contentId: number): void {
    const url = `api/Comments/NewComment`;
    if (this.createdComment.value != "") {
      this.requestService.sendRequest(url, 'POST', {
        "commentId": 0,
        "posterId": userId,
        "contentId": contentId,
        "commentContent": this.createdComment.value,
        "publishDate": "2023-06-02T16:57:11.611Z"
      })
        .then(response => {
          console.log(JSON.stringify(response));
        })
        .catch(err => {
          console.error('Error: ' + err);
        })
    }
  }

  clickComment(): void {
    const existingSessionKey = this.cookieService.get('sessionKey');
    console.log(`Session key: ${existingSessionKey}`);
    if (existingSessionKey) {
      this.createdComment = document.getElementById('created-comment') as HTMLInputElement
      this.postComment(this.loggedInUser.userId, this.shared.getWhichContent());
    }
    else {
      this.router.navigate(['/register']);
      alert("Yorum yapmak için kayıt olmalısınız...");//TO-DO
    }
  }

  like(userId: number, contentId: number): void {
    this.requestService.sendRequest('api/Likes/GetByContent/' + contentId, 'GET')
      .then(response => {
        if (response.data.length == 0) {
          this.requestService.sendRequest('api/Likes/NewLike', 'POST', {
            "likeId": 0,
            "userId": userId,
            "likedContentId": contentId,
            "dislike": 0,
            "likeDate": "2023-06-02T19:14:22.850Z" //Date will be edit
          })
            .then(response => {
              console.log(JSON.stringify(response));
            })
            .catch(err => {
              console.error('Error: ' + err);
            })
        }
        else {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].userId == this.loggedInUser.userId) {
              if(response.data[i].dislike == 0){
                this.requestService.sendRequest('api/Likes/DeleteLike/' + response.data[i].likeId, 'DELETE')
                .then(response => {
                  console.log(response.message);
                })
              }else{
                this.requestService.sendRequest('api/Likes/UpdateLike/'+response.data[i].likeId, 'PUT', {
                  "likeId": response.data[i].likeId,
                  "userId": userId,
                  "likedContentId": contentId,
                  "dislike": 0,
                  "likeDate": "2023-06-02T19:14:22.850Z" //Date will be edit
                })
                .then(response => {
                  console.log(response.message);
                })
              }
            }
            else {
              this.requestService.sendRequest('api/Likes/NewLike', 'POST', {
                "likeId": 0,
                "userId": userId,
                "likedContentId": contentId,
                "dislike": 0,
                "likeDate": "2023-06-02T19:14:22.850Z" //Date will be edit
              })
                .then(response => {
                  console.log(JSON.stringify(response));
                })
            }
          }
        }
      }).catch(err => {
        console.error('Error: ' + err);
      })
  }

  dislike(userId: number, contentId: number): void {
    this.requestService.sendRequest('api/Likes/GetByContent/' + contentId, 'GET')
      .then(response => {
        if (response.data.length == 0) {
          this.requestService.sendRequest('api/Likes/NewLike', 'POST', {
            "likeId": 0,
            "userId": userId,
            "likedContentId": contentId,
            "dislike": 1,
            "likeDate": "2023-06-02T19:14:22.850Z" //Date will be edit
          })
            .then(response => {
              console.log(JSON.stringify(response));
            })
            .catch(err => {
              console.error('Error: ' + err);
            })
        }
        else {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].userId == this.loggedInUser.userId) {
              if(response.data[i].dislike == 1){
                this.requestService.sendRequest('api/Likes/DeleteLike/' + response.data[i].likeId, 'DELETE')
                .then(response => {
                  console.log(response.message);
                })
              }else{
                this.requestService.sendRequest('api/Likes/UpdateLike/'+response.data[i].likeId, 'PUT', {
                  "likeId": response.data[i].likeId,
                  "userId": userId,
                  "likedContentId": contentId,
                  "dislike": 1,
                  "likeDate": "2023-06-02T19:14:22.850Z" //Date will be edit
                })
                .then(response => {
                  console.log(response.message);
                })
              }
            }
            else {
              this.requestService.sendRequest('api/Likes/NewLike', 'POST', {
                "likeId": 0,
                "userId": userId,
                "likedContentId": contentId,
                "dislike": 1,
                "likeDate": "2023-06-02T19:14:22.850Z" //Date will be edit
              })
                .then(response => {
                  console.log(JSON.stringify(response));
                })
            }
          }
        }
      }).catch(err => {
        console.error('Error: ' + err);
      })
  }

  clickLike(): void {
    this.like(this.loggedInUser.userId, this.shared.getWhichContent());
  }
  clickDislike(): void {
    this.dislike(this.loggedInUser.userId, this.shared.getWhichContent());
  }

  checkLike(contentId: number): void{
    this.requestService.sendRequest('api/Likes/GetByContent/'+contentId, 'GET')
    .then(response =>{
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].userId == this.loggedInUser.userId) {
          if(response.data[i].dislike == 0){
            let likeButton = document.getElementById('green')
            likeButton?.classList.toggle('green');
            console.log('like');
          }
          else if(response.data[i].dislike == 1){
            let likeButton = document.getElementById('red')
            likeButton?.classList.toggle('red');
            console.log('dislike');
          }
    }}})
  }

  ngOnInit(): void {
    
    this.getContentsByID(this.shared.getWhichContent());
    this.getCommentsByContentID(this.shared.getCommentByContent())
    const sessionKey = this.cookieService.get('sessionKey'); // Replace with your session key retrieval logic
    this.retrieveUsername(sessionKey);
  }

  ngAfterViewInit(): void {
    this.checkLike(this.shared.getWhichContent());
  }
  

}

