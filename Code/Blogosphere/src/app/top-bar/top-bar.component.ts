import { Component, OnInit } from '@angular/core';
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

  changeCategory(ID:number): void{
    this.shared.setWhichCategory(ID);
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
        this.categoriess = response;
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  ngOnInit(): void { 
      this.getCategories();
      
  }

}
