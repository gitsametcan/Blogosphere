import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { urlencoded } from 'body-parser';
import { RequestService } from '../request.service';
import { response } from 'express';
import { UserService } from '../UserService';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface ContentDetail {
  contentId: number,
  title: string,
  publishDate: string,
  content1: string,
  imagePath: string,
  authorId: number,
  categoryId: number,
  visibility: number,
  shortDescription: string
}

interface Comment {
      comment: {
        commentId: 0,
        posterId: 0,
        contentId: 0,
        commentContent: string,
        publishDate: string
      },
      user: {
        userId: 0,
        userName: string,
        email: string,
        password: string,
        blocked: 0,
        userType: string
      }
}

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css']
})
export class ContentDetailsComponent implements OnInit {

  userType = this.shared.getCurrentUSerType();

  constructor(private shared: SharedService, private requestService: RequestService, private userService: UserService, private cookieService: CookieService, private router: Router,private route:ActivatedRoute) { }

  contentObj: ContentDetail = {
    contentId: 0,
    title: '',
    publishDate: '',
    content1: '',
    imagePath: '',
    authorId: 0,
    categoryId: 0,
    visibility: 0,
    shortDescription: ''
  };

  commentObj: Comment = {
    comment: {
        commentId: 0,
        posterId: 0,
        contentId: 0,
        commentContent: "",
        publishDate: ""
      },
      user: {
        userId: 0,
        userName: "",
        email: "",
        password: "",
        blocked: 0,
        userType: ""
      }
  };

  comments: Comment[] = [];

  content!: ContentDetail;

  loggedInUser: any;
  createdComment: any;

  ID=this.route.snapshot.params['id'];
  getContentsByID(): void {
    this.requestService.sendRequest('api/Contents/GetById/' + this.ID, 'GET')
      .then(response => {
        this.content = response.data;
        this.getImage(this.content.imagePath, this.ID);
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  getCommentsByContentID(): void {
    this.requestService.sendRequest('api/Comments/GetByContent/' + this.ID, 'GET')
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
    let url = `api/Comments/NewComment`;
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
          this.getCommentsByContentID();
          this.createdComment.value = "";
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
      this.postComment(this.loggedInUser.userId, this.ID);
    }
    else {
      this.router.navigate(['/login']);
      alert("Yorum yapmak için giriş yapmalısınız...");//TO-DO
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
              console.log(JSON.stringify(response + ' if'));
              this.likeAndDislikeCount();
            })
            .catch(err => {
              console.error('Error: ' + err);
            })
        }
        else {
          let isMine = false;
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].userId == this.loggedInUser.userId) {
              if(response.data[i].dislike == 0){
                this.requestService.sendRequest('api/Likes/DeleteLike/' + response.data[i].likeId, 'DELETE')
                .then(response => {
                  console.log(response.message + 'delete ' + i);
                  this.likeAndDislikeCount();
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
                  this.likeAndDislikeCount();
                })
              }
              isMine = true
              break;
            }
          }
          if(!isMine){
            this.requestService.sendRequest('api/Likes/NewLike', 'POST', {
              "likeId": 0,
              "userId": userId,
              "likedContentId": contentId,
              "dislike": 0,
              "likeDate": "2023-06-02T19:14:22.850Z" //Date will be edit
            })
              .then(response => {
                console.log(JSON.stringify(response + ' post '));
                this.likeAndDislikeCount();
              })
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
              this.likeAndDislikeCount();
            })
            .catch(err => {
              console.error('Error: ' + err);
            })
        }
        else {
          let isMine = false;
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].userId == this.loggedInUser.userId) {
              if(response.data[i].dislike == 1){
                this.requestService.sendRequest('api/Likes/DeleteLike/' + response.data[i].likeId, 'DELETE')
                .then(response => {
                  console.log(response.message);
                  this.likeAndDislikeCount();
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
                  this.likeAndDislikeCount();
                })
              }
              isMine = true;
              break;
            }
          }
          if(!isMine){
            this.requestService.sendRequest('api/Likes/NewLike', 'POST', {
              "likeId": 0,
              "userId": userId,
              "likedContentId": contentId,
              "dislike": 1,
              "likeDate": "2023-06-02T19:14:22.850Z" //Date will be edit
            })
              .then(response => {
                console.log(JSON.stringify(response));
                this.likeAndDislikeCount();
              })
          }
        }
      }).catch(err => {
        console.error('Error: ' + err);
      })
  }

  clickLike(): void {
    const existingSessionKey = this.cookieService.get('sessionKey');
    console.log(`Session key: ${existingSessionKey}`);
    if (existingSessionKey) {
      this.like(this.loggedInUser.userId, this.ID);
    }
    else {
      this.router.navigate(['/login']);
      alert("Post beğenmek için giriş yapmalısınız...");//TO-DO
    }
    
  }
  clickDislike(): void {
    const existingSessionKey = this.cookieService.get('sessionKey');
    console.log(`Session key: ${existingSessionKey}`);
    if (existingSessionKey) {
      this.dislike(this.loggedInUser.userId, this.ID);
    }
    else {
      this.router.navigate(['/login']);
      alert("Post beğenmemek için giriş yapmalısınız...");//TO-DO
    }
    
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

  likeAndDislikeCount(): void{
    this.requestService.sendRequest(`api/Likes/GetCountByContentAndDislike/${this.ID}?Dislike=0`, 'GET')
    .then(response => {
      console.log('like: ' + response.data);
      const likeButton = document.getElementById('green');
      likeButton!.innerHTML = `<i class="fa fa-thumbs-up fa-lg" aria-hidden="true">` + response.data;
    })
    .catch(err => {
      console.error(err);
    })
    this.requestService.sendRequest(`api/Likes/GetCountByContentAndDislike/${this.ID}?Dislike=1`, 'GET')
    .then(response => {
      console.log('dislike: ' + response.data);
      const likeButton = document.getElementById('red');
      likeButton!.innerHTML = `<i class="fa fa-thumbs-down fa-lg" aria-hidden="true">` + response.data;
    })
    .catch(err => {
      console.error(err);
    })
  }

  blockContent():void{
    const url =`api/Contents/UpdateContent`;
    if(this.content.visibility){
      this.requestService.sendRequest(url, 'PUT',{
        "contentId": this.ID,
        "title": this.content.title,
        "publishDate": "2023-06-03T22:20:09.100Z",
        "content1": this.content.content1,
        "shortDescription": this.content.shortDescription,
        "imagePath": this.content.imagePath,
        "authorId": this.content.authorId,
        "categoryId": this.content.categoryId,
        "visibility": 0
      })
      .then(response => {
        console.log(JSON.stringify(response));
        this.content.visibility = 0;
        this.checkBlockContent();
        console.log('Visibility: ' + JSON.stringify(this.content.visibility));
      })
      .catch(err => {
        console.error('Error' + err);
      })
    }
    else{
      this.requestService.sendRequest(url, 'PUT',{
        "contentId": this.ID,
        "title": this.content.title,
        "publishDate": "2023-06-03T22:20:09.100Z",
        "content1": this.content.content1,
        "shortDescription": this.content.shortDescription,
        "imagePath": this.content.imagePath,
        "authorId": this.content.authorId,
        "categoryId": this.content.categoryId,
        "visibility": 1
      })
      .then(response => {
        console.log(JSON.stringify(response));
        this.content.visibility = 1;
        this.checkBlockContent();
        console.log('Visibility: ' + JSON.stringify(this.content.visibility));
      })
      .catch(err => {
        console.error('Error' + err);
      })

    }
    

  }

clickBlockContent():void{
  this.blockContent();
  
}

checkBlockContent():void{
  const blockButton = document.getElementById('block-btn')
  if(!this.content.visibility){
    blockButton?.classList.add('red');
  }
  else{
    blockButton?.classList.remove('red');
  }

}

  ngOnInit(): void {
    
    this.getContentsByID();
    this.getCommentsByContentID()
    const sessionKey = this.cookieService.get('sessionKey'); // Replace with your session key retrieval logic
    this.retrieveUsername(sessionKey);
  }

  ngAfterViewInit(): void {
    this.checkLike(this.ID);
    this.likeAndDislikeCount();
    this.checkBlockContent();
  }

}

