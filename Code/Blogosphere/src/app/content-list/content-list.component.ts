import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../app/shared/shared.service';
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

  getContentsByComment(ID:number): void {
    this.requestService.sendRequest('api/Contents/FindCommentedByUser/'+ID,'GET')
    .then(response => {
      this.contents = response.data;
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsByImpression(Id:number):void {
    this.requestService.sendRequest("api/Contents/FindLikedByUser?Id="+Id,'GET')
    .then(response => {
      this.contents = response.data;
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsByEditor(Id:number):void {
    this.requestService.sendRequest("api/Contents/GetByUser/1"+Id,'GET')
    .then(response => {
      this.contents = response.data;
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }


  ngOnInit(): void { 
    if(this.shared.getHowList()==1){
      this.getContentsByComment(1);
    }else if(this.shared.getHowList()==2){
      this.getContentsByImpression(1);
    }else if(this.shared.getHowList()==0){
      this.getContentsByEditor(1);
    }else if(this.shared.getHowList()==3){
      this.getContents();
    }
  }
}
