import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'

interface ContentDetail{
  contentId: 0,
  title: string,
  publishDate: string,
  content: string,
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
  
  constructor(private shared:SharedService){}

  contentObj: ContentDetail = {
    contentId: 0,
    title: '',
    publishDate: '',
    content: '',
    imagePath: '',
    authorId: 0,
    categoryId: 0,
    visibility: 0
  };

  content!: ContentDetail;

  getContentsByID(ID:number): void {
    fetch('http://localhost:5204/api/Contents/GetById/'+ID)
      .then(response => response.json())
      .then(data => {
        this.content = data;
        console.log('ContentsByID:', this.content);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  ngOnInit(): void { 
      this.getContentsByID(this.shared.getWhichContent());
  }

}

