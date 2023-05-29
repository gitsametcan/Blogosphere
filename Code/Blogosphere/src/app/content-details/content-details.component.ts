import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { urlencoded } from 'body-parser';
import { RequestService } from '../request.service';
import { response } from 'express';

interface ContentDetail{
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
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css']
})
export class ContentDetailsComponent implements OnInit{
  
  constructor(private shared:SharedService, private requestService: RequestService){}

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

  content!: ContentDetail;

  getContentsByID(ID:number):void {
    this.requestService.sendRequest('api/Contents/GetById/'+ID,'GET')
      .then(response => {
        this.content = response.data;
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  ngOnInit(): void { 
      this.getContentsByID(this.shared.getWhichContent());
  }

}

