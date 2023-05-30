import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { RequestService } from '../request.service';


interface Content{
  contentId: 0,
  title: string,
  publishDate: string,
  content1: string,
  shortDescription:string,
  imagePath: string,
  authorId: 0,
  categoryId: 0,
  visibility: 0
}

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {


  constructor(private shared:SharedService,private requestService: RequestService){}

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

  setContentDetail(ID:number): void{
    this.shared.setWhichContent(ID);
  }

  a = this.shared.getHowList();

  

  contentsa=[
    {title: "Contents 1", date: "16.05.2001", editor: "madwriter"},
    {title: "Contents 2", date: "20.10.1998", editor: "bigheart"},
    {title: "Contents 3", date: "13.06.1998", editor: "23kk23"}
  ];

  contents: Content[] = [];

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
    if(this.shared.getHowList()==1){
      //this.getContentsByComment();
    }else if(this.shared.getHowList()==2){
      //this.getContentsByImpression();
    }else if(this.shared.getTrend()==3){
      //this.getContentsByEditor(7);
    }else{
      this.getContents();
    }
  }
}
