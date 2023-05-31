import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { RequestService } from '../request.service';


interface User{
  userId: 0,
  userName: string,
  email: string,
  userType: 0,
  activicy: boolean
}


@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  constructor(private requestService: RequestService, private shared: SharedService){}


  usera: User = {
  userId: 0,
  userName: '',
  email: '',
  userType: 0,
  activicy: false
  };

  user!:User;

  getUserById(ID:number):void{
    this.requestService.sendRequest('api/Users/GetById/'+ID,'GET')
      .then(response => {
        this.user = response;
      })
      .catch(err => {
        console.error("Error: " + err);
      })

  }

  setWhichCategory(ID:number): void{
    this.shared.setHowList(ID);
  }

  ngOnInit(): void {
      this.getUserById(0);
  }

  tabs: string[] = ['Informations','New Password','My Contents','My Comments','My Impressions','All Users','All Contents'];
  tabsa: string[] = ['Informations','New Password','My Contents','My Comments','My Impressions','All Users','All Contents'];
  

  selectedtab = this.tabs[0];

  writeOnLog(string:any){
    if (string==='My Contents'){
      this.shared.setHowList(0);
    }
    else if (string==='My Comments'){
      this.shared.setHowList(1);
    }
    else if (string==='My Impressions'){
      this.shared.setHowList(2);
    }
    else if (string==='All Contents'){
      this.shared.setHowList(3);
    }
  }
}
