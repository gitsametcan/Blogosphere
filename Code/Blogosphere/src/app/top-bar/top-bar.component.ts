import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'

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

  constructor(private shared: SharedService){}
  categories=[
    {id: 0 , type: "Environment"},
    {id: 1 , type: "Pollution"},
    {id: 2 , type: "Forest Fire"},
    {id: 3 , type: "Earthquake"},
  ]

  categoriess: Category[] = [];
  getCategories(): void {
    fetch('http://localhost:5204/api/Categorys/GetAll')
      .then(response => response.json())
      .then(data => {
        this.categoriess = data;
        console.log('Categories:', this.categoriess);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  ngOnInit(): void { 
      this.getCategories();
  }

}
