import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { RequestService } from '../request.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


interface User{
  userId: number,
  userName: string,
  email: string,
  password: string,
  blocked: number,
  userType: string
}


@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  constructor(private requestService: RequestService,
     private shared: SharedService,
     private route: ActivatedRoute){}


  users!:User;

  async getUserById(ID:number):Promise<void>{
    await this.requestService.sendRequest('api/Users/GetById/'+ID,'GET')
      .then(response => {
        this.users = response.data;
        console.log(response.data.userType);
        console.log(this.users.userType);
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  getUser():User[]{
    let userl:User[]=[this.users];
    return userl;
  }

  setWhichCategory(ID:number): void{
    this.shared.setHowList(ID);
  }

  ngOnInit(): void {
      this.getUserById((this.route.snapshot.params['id']));
  }


  setTabs():string[]{
    let tabs: string[] = ['Informations','New Password','My Contents','My Comments','My Impressions'];
    //let usera:User = this.getUser()[0];
    if(this.users.userType == "member"){
      let element:string = 'All Users';
      let element2:string = 'All Contents';
      tabs.push(element);
      tabs.push(element2);
    }
    return tabs;
  }
  tabs: string[] = ['Informations','New Password','My Contents','My Comments','My Impressions','All Users','All Contents'];
  tabsa: string[] = ['Informations','New Password','My Contents','My Comments','My Impressions','All Users','All Contents'];
  
  
  selectedtab = this.tabs[0];
  

  writeOnLog(string:any){
    if (string=='My Contents'){
      this.shared.setHowList(0);
    }
    else if (string=='My Comments'){
      this.shared.setHowList(1);
    }
    else if (string=='My Impressions'){
      this.shared.setHowList(2);
    }
    else if (string=='All Contents'){
      this.shared.setHowList(3);
    }
  }
}
