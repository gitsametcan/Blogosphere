import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { urlencoded } from 'body-parser';
import { RequestService } from '../request.service';
import { response } from 'express';

interface Category{
  categoryId: 0,
  categoryTitle: string,
  categoryDescription: string,
}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    categoryObj: Category = {
    categoryId: 0,
    categoryTitle: '',
    categoryDescription: '',
  };

  enteredSearchValue: string = '';

  changeCategory(ID:number): void{
    this.shared.setWhichCategory(ID);
    this.shared.setWhichTitleOrContent("");
    this.shared.setTrend(0);
  }

  listSearchedContents():void{
    this.shared.setWhichTitleOrContent(this.enteredSearchValue);
    window.location.reload();
  }

  listTrends():void{
    this.shared.setWhichCategory(0);
    this.shared.setTrend(1);
  }

  constructor(private shared: SharedService, private requestService: RequestService){}
  categories=[
    {id: 0 , type: "Environment"},
    {id: 1 , type: "Pollution"},
    {id: 2 , type: "Forest Fire"},
    {id: 3 , type: "Earthquake"},
  ]

  categoriess: Category[] = [];
  getCategories():void {
    this.requestService.sendRequest('api/Categorys/GetAll','GET')
      .then(response => {
        this.categoriess = response.data;
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  ngOnInit(): void { 
      this.getCategories();
  }

  @Output()
  searchTextChanged: EventEmitter<any>=new EventEmitter<any>();

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);
    console.log(this.enteredSearchValue);
  }

}
