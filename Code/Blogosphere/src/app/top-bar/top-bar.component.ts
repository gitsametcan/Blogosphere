import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  categories=[
    {id: 0 , type: "Environment"},
    {id: 1 , type: "Pollution"},
    {id: 2 , type: "Forest Fire"},
    {id: 3 , type: "Earthquake"},
  ]

}
