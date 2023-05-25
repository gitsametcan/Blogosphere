import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent {


  tabs: string[] = ['Informations','New Password','My Contents','My Comments','My Impressions'];
selectedtab = this.tabs[0];
}
