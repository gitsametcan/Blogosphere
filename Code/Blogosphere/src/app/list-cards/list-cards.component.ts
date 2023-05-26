import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'

interface Content{
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
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit{

  constructor(private shared:SharedService){}

  contentObj: Content = {
    contentId: 0,
    title: '',
    publishDate: '',
    content: '',
    imagePath: '',
    authorId: 0,
    categoryId: 0,
    visibility: 0
  };

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
  getContents(): void {
    
    fetch('http://localhost:5204/api/Contents/GetAll')
      .then(response => response.json())
      .then(data => {
        this.contents = data;
        console.log('Contents:', this.contents);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getContentsByID(ID:number): void {
    fetch('http://localhost:5204/api/Contents/GetByCategory/'+ID)
      .then(response => response.json())
      .then(data => {
        this.contents = data;
        console.log('ContentsByID:', this.contents);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  ngOnInit(): void { 
    if(this.shared.getWhichCategory()>0){
      this.getContentsByID(this.shared.getWhichCategory());
    }else{
      this.getContents();
    }
  }
  
  
}
