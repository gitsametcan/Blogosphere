import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { urlencoded } from 'body-parser';
import { RequestService } from '../request.service';
import { response } from 'express';


interface Content{
  contentId: 0,
  title: string,
  publishDate: string,
  content1: string,
  imagePath: string,
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

  constructor(private shared:SharedService,private requestService: RequestService){}

  contentObj: Content = {
    contentId: 0,
    title: '',
    publishDate: '',
    content1: '',
    imagePath: '',
    authorId: 0,
    categoryId: 0,
    visibility: 0
  };

  setContentDetail(ID:number): void{
    this.shared.setWhichContent(ID);
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
      console.log(this.contents)
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsByID(ID:number): void {
    this.requestService.sendRequest('api/Contents/GetByCategory/'+ID,'GET')
    .then(response => {
      this.contents = response.data;
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsBySearchingTitle(KEYWORD:any):void {
    this.requestService.sendRequest("api/Contents/SearchContainsInTitle?keyword="+KEYWORD,'GET')
    .then(response => {
      this.contents = response.data;
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getTrendContents(DAY:number):void {
    this.requestService.sendRequest("api/Contents/GetTrendings?sinceDays="+DAY,'GET')
    .then(response => {
      this.contents = response.data;
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }


  ngOnInit(): void { 
    if(this.shared.getWhichCategory()>0){
      this.getContentsByID(this.shared.getWhichCategory());
    }else if(this.shared.getWhichTitleOrContent()){
      this.getContentsBySearchingTitle(this.shared.getWhichTitleOrContent());
    }else if(this.shared.getTrend()>0){
      this.getTrendContents(7);
    }else{
      this.getContents();
    }
  }
  
  
}
