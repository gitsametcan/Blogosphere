import { Component, OnInit } from '@angular/core';

//declare function sendRequest(url:string,method: string,data?:any):any;

declare function sendRequest(url:string, method:string, data?:any):any;

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  categories=[
    {id: 0 , type: "Environment"},
    {id: 1 , type: "Pollution"},
    {id: 2 , type: "Forest Fire"},
    {id: 3 , type: "Earthquake"},
  ]

  ngOnInit(): void {
    let response = sendRequest('http://localhost:5204/api/Comments/GetAll','GET');
    console.log(JSON.stringify(response));
  }

}
