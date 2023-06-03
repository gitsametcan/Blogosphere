import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../app/shared/shared.service'
import { RequestService } from '../request.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../UserService';


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


  userLog!:User;
  userOn!:User;
  changableUserId!:Number;
  situation!:Number;

  getCurretnUserById(ID:Number):void{
    this.requestService.sendRequest('api/Users/GetById/'+ID,'GET')
      .then(response => {
        this.userLog = response.data;
        if(response.data.userId!=this.shared.getLogUserId()){
          this.ngOnInit();
        }
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  getOnUserById(ID:number):void{
    this.requestService.sendRequest('api/Users/GetById/'+ID,'GET')
      .then(response => {
        this.userOn = response.data;
        if (response.data.userId!=this.shared.getOnUserId()){
          this.shared.setOnUserId(ID);
          this.ngOnInit();
        }
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  getSituation():Number{
    console.log("On=" + this.shared.getOnUserId() + "  Current="+ this.shared.getLogUserId())
    console.log(this.shared.getCurrentUSerType())
    if(this.shared.getCurrentUSerType()=='admin'){
      if((this.route.snapshot.params['id'])==this.shared.getLogUserId())return 0
      else return 1;
    }
    else return 0;
  }

  getUser():User[]{
    let userl:User[]=[this.userOn];
    return userl;
  }

  setWhichCategory(ID:number): void{
    this.shared.setHowList(ID);
  }

  ngOnInit(): void {
      this.getOnUserById((this.route.snapshot.params['id']));
      this.getCurretnUserById(this.shared.getLogUserId());
      if((this.route.snapshot.params['id'])==this.shared.getLogUserId())this.selectedtab = this.tabs[1];
  }


  setTabs():string[]{
    let tabs: string[] = ['Informations','New Password','My Contents','My Comments','My Impressions'];
    //let usera:User = this.getUser()[0];
    if(this.userLog.userType == "admin"){
      let element:string = 'All Users';
      let element2:string = 'All Contents';
      tabs.push(element);
      tabs.push(element2);
    }
    return tabs;
  }
  tabs: string[] = ['Informations','New Password','My Contents','My Comments','My Impressions','All Users','All Contents'];
  
  
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

  getUserForUpdate(id:Number):User{
    let updateUser:User = {
      userId: 0,
      userName: '',
      email: 'string',
      password: 'string',
      blocked: 0,
      userType: 'string'
    };
    this.requestService.sendRequest('api/Users/GetById/'+id,'GET')
      .then(response => {
        updateUser = response.data;
        return updateUser;
      })
      .catch(err => {
        console.error("Error: " + err);
      })
      return updateUser;

  }
  blockUser(id:Number):void{
    let userWillUpdate:User = this.getUserForUpdate(id);
    if (userWillUpdate.userId != 0){
      this.requestService.sendRequest('api/Users/UpdateUser/'+id, 'PUT',{
        "userId": userWillUpdate.userId,
        "userName": userWillUpdate.userName,
        "email": userWillUpdate.email,
        "password": userWillUpdate.password,
        "blocked": 1,
        "userType": "member"
      })
    }
  }

  updateUser(id:Number):void{

  }

}
