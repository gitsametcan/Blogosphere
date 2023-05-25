import { Component } from '@angular/core';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent {

  contents=[
    {title: "Contents 1", date: "16.05.2001", editor: "madwriter"},
    {title: "Contents 2", date: "20.10.1998", editor: "bigheart"},
    {title: "Contents 3", date: "13.06.1998", editor: "23kk23"}
  ];
}
