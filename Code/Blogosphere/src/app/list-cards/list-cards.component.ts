import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { urlencoded } from 'body-parser';
import { RequestService } from '../request.service';
import { response } from 'express';
import { UserService } from '../UserService';
import { CookieService } from 'ngx-cookie-service';




interface Content{
  contentId: 0,
  title: string,
  publishDate: string,
  content1: string,
  shortDescription:string,
  imagePath: any,
  authorId: 0,
  categoryId: 0,
  visibility: 0
}


@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit{

  public numberOfContents = 18; // This will be supplied by database
  public numberOfContentsInPerPage= Math.ceil(this.numberOfContents/6)>7 ? Math.ceil(this.numberOfContents/7) : 6;
  public selectedPage=1;

  constructor(private shared:SharedService,private requestService: RequestService,private userService:UserService,private cookieService: CookieService){
    
  }

  contentObj: Content = {
    contentId: 0,
    title: '',
    publishDate: '',
    content1: '',
    shortDescription: '',
    imagePath: '',
    authorId: 0,
    categoryId: 0,
    visibility: 0
  };
  //loggedInUser: any;

  

  setContentDetail(ID:number): void{
    this.shared.setWhichContent(ID);
  }

  setCommentByContent(ID:number): void{
    this.shared.setCommentByContent(ID);
  }
  news=[
    {image: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg", title: "new1", text: "new1 text part"},
    {image: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg", title: "new1", text: "new1 text part"},
    {image: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg", title: "new1", text: "new1 text part"},
    {image: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg", title: "new1", text: "new1 text part"},
    {image: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg", title: "new1", text: "new1 text part"},
    {image: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg", title: "new1", text: "new1 text part"},
    {image: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg", title: "new1", text: "new1 text part"},
    {image: "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg", title: "new1", text: "new1 text part"},
  ];

  contents: Content[] = [];
  // getContentsByID(ID:number): void {
  //   fetch('http://localhost:5204/api/Contents/GetByCategory/'+ID)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.contents = data;
  //       console.log('ContentsByID:', this.contents);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }

  getContents(): void {
    this.requestService.sendRequest('api/Contents/GetAll','GET')
    .then(response => {
      this.contents = response.data;
      console.log(this.contents);
      this.contents.forEach(element => {
        console.log("Buradayım");
        let url=element.imagePath;
        let id=element.contentId;
        console.log("Image: "+url+ " ID: "+id);
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
    
    
  }

  getContentsByID(ID:number): void {
    this.requestService.sendRequest('api/Contents/GetByCategory/'+ID,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        console.log("Buradayım");
        let url=element.imagePath;
        let id=element.contentId;
        console.log("Image: "+url+ " ID: "+id);
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsBySearchingTitle(KEYWORD:any):void {
    this.requestService.sendRequest("api/Contents/SearchContainsInTitle?keyword="+KEYWORD,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        console.log("Buradayım");
        let url=element.imagePath;
        let id=element.contentId;
        console.log("Image: "+url+ " ID: "+id);
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getTrendContents(DAY:number):void {
    this.requestService.sendRequest("api/Contents/GetTrendings?sinceDays="+DAY,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        console.log("Buradayım");
        let url=element.imagePath;
        let id=element.contentId;
        console.log("Image: "+url+ " ID: "+id);
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getImage(img:string,id:number) : void {
    const url = 'http://localhost:5204/'+img;
    const options = {
        method: "GET"
    }
    fetch(url, options)
    .then(async response=>{
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      let image = <HTMLElement>document.getElementById(id.toString()) as HTMLImageElement;
      image.src = imageObjectURL;
    }).catch(error=>{
      console.error('Error:', error);
    })
  }

  getContentsByPaging(pageNumber:number) : void {
    this.requestService.sendRequest('api/Contents/GetAllWithPages?PageSize='+this.numberOfContentsInPerPage+'&PageNumber='+pageNumber,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        let url=element.imagePath;
        let id=element.contentId;
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
    
  }

  pagingArray: number[]=this.pageNumbers;
   
  get pageNumbers(): number[]{
    return Array(Math.ceil(this.numberOfContents/this.numberOfContentsInPerPage))
      .fill(0)
      .map((a,i)=>i+1)
  }

  changePage(index:number):void{
    this.selectedPage=index;
    this.ngOnInit();
  }



  ngOnInit(): void { 
    if(this.shared.getWhichCategory()>0){
      this.getContentsByID(this.shared.getWhichCategory());
    }else if(this.shared.getWhichTitleOrContent()){
      this.getContentsBySearchingTitle(this.shared.getWhichTitleOrContent());
    }else if(this.shared.getTrend()>0){
      this.getTrendContents(7);
    }else{
      this.getContentsByPaging(this.selectedPage-1);
    }
  //const sessionKey = this.cookieService.get('sessionKey'); // Replace with your session key retrieval logic
  //this.retrieveUsername(sessionKey);


  }

  //LOGİN OLAN KULLANICIYA AİT VERİLERİ ÇEKME-----------
  /*
  retrieveUsername(sessionKey: string): void {
    const url = `api/Sessions/FindUser?SessionKey=${sessionKey}`;
    this.requestService.sendRequest(url, 'GET')
      .then((response) => {
        if (response.success && response.data) {
          // Save the user information in the shared service
          this.userService.setLoggedInUser(response.data);
          this.loggedInUser = response.data.userName
  
        } else {
          console.error('Failed to retrieve user data:', response.message);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }*/
}

  
  
