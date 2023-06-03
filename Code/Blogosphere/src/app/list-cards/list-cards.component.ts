import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../app/shared/shared.service';
import { RequestService } from '../request.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


interface Content{
  contentId: 0,
  title: string,
  publishDate: string,
  content1: string,
  shortDescription:string,
  imagePath: any,
  authorId: 0,
  categoryId: 0,
  visibility: 0
}

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit{

  public numberOfContents =  this.shared.getContentCount();
  public numberOfContentsInPerPage= Math.ceil(this.numberOfContents/6)>7 ? Math.ceil(this.numberOfContents/7) : 6;
  public selectedPage=1;

  constructor(private shared:SharedService,private requestService: RequestService, private route:ActivatedRoute){}

  contentObj: Content = {
    contentId: 0,
    title: '',
    publishDate: '',
    content1: '',
    shortDescription: '',
    imagePath: '',
    authorId: 0,
    categoryId: 0,
    visibility: 0
  };

  ID=this.route.snapshot.params['id'];
  setContentDetail(): void{
    this.shared.setWhichContent(this.ID);
  }

  setCommentByContent(): void{
    this.shared.setCommentByContent(this.ID);
  }

  contents: Content[] = [];

  getAllContentsCount() : void{
    this.requestService.sendRequest('api/Contents/GetAllCount','GET')
    .then(response => {
      this.shared.setContentCount(response.data);
    })
    .catch(err => {
      console.error("Error: " + err);
  })
  }

  getContents(): void {
    this.requestService.sendRequest('api/Contents/GetAll','GET')
    .then(response => {
      this.contents = response.data;
      console.log(this.contents);
      this.contents.forEach(element => {
        let url=element.imagePath;
        let id=element.contentId;
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsByCategoryIDCount(ID:number):void{
    this.requestService.sendRequest('api/Contents/GetByCategoryCount/'+ID,'GET')
    .then(response => {
      this.shared.setContentCount(response.data);
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsByCategoryID(ID:number): void {
    this.requestService.sendRequest('api/Contents/GetByCategory/'+ID,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        let url=element.imagePath;
        let id=element.contentId;
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsByCategoryIDWithPaging(ID:number,pageNumber:number):void{
    this.requestService.sendRequest("api/Contents/GetByCategoryWithPages/"+ID+"?PageSize="+this.numberOfContentsInPerPage+"&PageNumber="+pageNumber,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        let url=element.imagePath;
        let id=element.contentId;
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsBySearchingTitleCount(KEYWORD:any):void{
    localStorage.setItem('denememiz',"girdi mi")
    this.requestService.sendRequest("api/Contents/SearchContainsInTitleCount?keyword="+KEYWORD,'GET')
    .then(response => {
      console.log(response.data);
      this.shared.setContentCount(response.data);
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsBySearchingTitle(KEYWORD:any):void {
    this.requestService.sendRequest("api/Contents/SearchContainsInTitle?keyword="+KEYWORD,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        let url=element.imagePath;
        let id=element.contentId;
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsBySearchingTitleWithPaging(KEYWORD:any,pageNumber:number):void{
    this.requestService.sendRequest("api/Contents/SearchContainsInTitleWithPages?keyword="+KEYWORD+"&PageSize="+this.numberOfContentsInPerPage+"&PageNumber="+pageNumber,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        let url=element.imagePath;
        let id=element.contentId;
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getTrendContentsCount(DAY:number):void{
    this.requestService.sendRequest("api/Contents/GetTrendingsCount?sinceDays="+DAY,'GET')
    .then(response => {
      this.shared.setContentCount(response.data);
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getTrendContents(DAY:number):void {
    this.requestService.sendRequest("api/Contents/GetTrendings?sinceDays="+DAY,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        let url=element.imagePath;
        let id=element.contentId;
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getTrendContentsByPaging(DAY:number,pageNumber:number):void{
    this.requestService.sendRequest("api/Contents/GetTrendingsWithPages?sinceDays="+DAY+"&PageSize="+this.numberOfContentsInPerPage+"&PageNumber="+pageNumber,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        let url=element.imagePath;
        let id=element.contentId;
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })


  }

  getImage(img:string,id:number) : void {
    const url = 'http://localhost:5204/'+img;
    const options = {
        method: "GET"
    }
    fetch(url, options)
    .then(async response=>{
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      let image = <HTMLElement>document.getElementById(id.toString()) as HTMLImageElement;
      image.src = imageObjectURL;
    }).catch(error=>{
      console.error('Error:', error);
    })
  }

  getContentsByPaging(pageNumber:number) : void {
    this.requestService.sendRequest('api/Contents/GetAllWithPages?PageSize='+this.numberOfContentsInPerPage+'&PageNumber='+pageNumber,'GET')
    .then(response => {
      this.contents = response.data;
      this.contents.forEach(element => {
        let url=element.imagePath;
        let id=element.contentId;
        this.getImage(url,id);
      });
    })
    .catch(err => {
      console.error("Error: " + err);
    })
    
  }
   
  get pageNumbers(): number[]{
      return Array(Math.ceil(this.numberOfContents/this.numberOfContentsInPerPage))
      .fill(0)
      .map((a,i)=>i+1)
  }

  changePage(index:number):void{
    this.selectedPage=index;
    this.ngOnInit();
  }

  changeCount(type:any):void{
    let value:boolean=this.shared.getListPriority()===type;
    if(!value){
      if(type==="Homepage"){
        this.shared.setListPriority(type);
        this.getAllContentsCount();
      }else if(type==="Search"){
        this.shared.setListPriority(type);
        this.getContentsBySearchingTitleCount(this.shared.getWhichTitleOrContent());
      }else if(type==="Trends"){
        this.shared.setListPriority(type);
        this.getTrendContentsCount(7);
      }else{
        this.shared.setListPriority(type);
        this.getContentsByCategoryIDCount(Number(type));
      }
      window.location.reload();
    }
  }

  invisiblePagination(statu:boolean):void{
    let paginationRow = <HTMLElement>document.getElementById("pagination-row") as HTMLDivElement;
    if(!statu){
      paginationRow.style.visibility="hidden";
    }else{
      paginationRow.style.visibility="visible";
    }
  }

  ngOnInit(): void { 
    if(!this.shared.getContentCount()){
      this.getAllContentsCount();
    }
    this.changeCount(this.shared.getWhichPage());    
    if(this.shared.getWhichCategory()>0){
      this.invisiblePagination(false);
      this.getContentsByCategoryID(this.shared.getWhichCategory());
    }else if(this.shared.getWhichTitleOrContent()){
      this.invisiblePagination(false);
      this.getContentsBySearchingTitle(this.shared.getWhichTitleOrContent());
    }else if(this.shared.getTrend()>0){
      this.getTrendContentsByPaging(7,this.selectedPage-1);
    }else{
      this.getContentsByPaging(this.selectedPage-1);
    }


  //const sessionKey = this.cookieService.get('sessionKey'); // Replace with your session key retrieval logic
  //this.retrieveUsername(sessionKey);


  }

  //LOGİN OLAN KULLANICIYA AİT VERİLERİ ÇEKME-----------
  /*
  retrieveUsername(sessionKey: string): void {
    const url = `api/Sessions/FindUser?SessionKey=${sessionKey}`;
    this.requestService.sendRequest(url, 'GET')
      .then((response) => {
        if (response.success && response.data) {
          // Save the user information in the shared service
          this.userService.setLoggedInUser(response.data);
          this.loggedInUser = response.data.userName
  
        } else {
          console.error('Failed to retrieve user data:', response.message);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }*/
}

  
  
