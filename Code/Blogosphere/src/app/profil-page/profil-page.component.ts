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
  situation!:Number;
  emailInput:String=" ";
  userNameInput:String=" ";
  oldPassword:String=" ";
  newPassword:String=" ";
  newPasswordAgain:String=" ";

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
    //console.log("On=" + this.shared.getOnUserId() + "  Current="+ this.shared.getLogUserId())
    //console.log(this.shared.getCurrentUSerType())
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

  blockUser(id:Number):void{
    if (this.userOn.userId==id){
      this.requestService.sendRequest('api/Users/BanUser?id='+id,'GET')
      .then(response => {
        alert(response.message);
      })
      .catch(err => {
        console.error("Error: " + err);
      })
    }
  }

  unblockUser(id:Number):void{
    if (this.userOn.userId==id){
      this.requestService.sendRequest('api/Users/UnbanUser?id='+id,'GET')
      .then(response => {
        alert(response.message);
      })
      .catch(err => {
        console.error("Error: " + err);
      })
    }
  }

  updateUser(id:Number):void{
    
    if (this.emailInput==" ")this.emailInput = this.userLog.email;
    if (this.userNameInput==" ")this.userNameInput = this.userLog.userName;
    console.log(this.userNameInput);
    console.log(this.emailInput);
    if (id==this.userLog.userId){
    this.requestService.sendRequest('api/Users/UpdateUser/'+id, 'PUT', {
      "userId": this.userLog.userId,
      "userName": this.userNameInput,
      "email": this.emailInput,
      "password": this.userLog.userId,
      "blocked": this.userLog.blocked,
      "userType": this.userLog.userType
    })
    .then(response => {
      console.log(response.message);
      alert(response.message);
      this.userNameInput = " ";
      this.emailInput = " ";
    })
    .catch(err => {
      alert("olmayor");
      console.error("Error: " + err);
    })}

  }

  setAuthorization(id:Number,authorization:string):void{

  }

  updatePassword(id:Number):void{
    console.log(this.newPassword);
    if (this.userOn.password == this.oldPassword && this.newPassword == this.newPasswordAgain)console.log(this.newPassword);

    if (id==this.userLog.userId){
      this.requestService.sendRequest('api/Users/UpdateUser/'+id, 'PUT', {
        "userId": this.userLog.userId,
        "userName": this.userLog.userName,
        "email": this.userLog.email,
        "password": this.newPassword,
        "blocked": this.userLog.blocked,
        "userType": this.userLog.userType
      })
      .then(response => {
        console.log(response.message);
        alert(response.message);
        this.userNameInput = " ";
        this.emailInput = " ";
      })
      .catch(err => {
        alert("olmayor");
        console.error("Error: " + err);
      })}

  }

}
