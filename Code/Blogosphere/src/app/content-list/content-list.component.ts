import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../app/shared/shared.service';
import { RequestService } from '../request.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


interface Content{
  contentId: 0,
  title: string,
  publishDate: string,
  content1: string,
  shortDescription:string,
  imagePath: string,
  authorId: 0,
  categoryId: 0,
  visibility: 0
}

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

  public numberOfContents =  this.shared.getContentCount();
  public numberOfContentsInPerPage= Math.ceil(this.numberOfContents/10)>7 ? Math.ceil(this.numberOfContents/7) : 10;
  public selectedPage=1;

  constructor(private shared:SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private requestService: RequestService){}

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

  setContentDetail(ID:number): void{
    this.shared.setWhichContent(ID);
  }

  contents: Content[] = [];

  getContents(): void {
    this.requestService.sendRequest('api/Contents/GetAll','GET')
    .then(response => {
      this.contents = response.data;
      console.log("all");
      if (this.shared.getHowList()!=3){
        this.ngOnInit();
      }
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsByComment(ID:Number): void {
    this.requestService.sendRequest('api/Contents/FindCommentedByUser?Id='+ID,'GET')
    .then(response => {
      this.contents = response.data;
      if (this.shared.getHowList()!=1){
        this.ngOnInit();
      }
      console.log("comment");
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsByImpression(Id:Number):void {
    this.requestService.sendRequest("api/Contents/FindLikedByUser?Id="+Id,'GET')
    .then(response => {
      this.contents = response.data;
      if (this.shared.getHowList()!=2){
        this.ngOnInit();
      }
      console.log("impression");
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getContentsByEditor(Id:Number):void {
    this.requestService.sendRequest("api/Contents/GetByUser/"+Id,'GET')
    .then(response => {
      this.contents = response.data;
      if (this.shared.getHowList()!=0){
        this.ngOnInit();
      }
      console.log("editor");
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  getAllContentsCount() : void{
    this.requestService.sendRequest('api/Contents/GetAllCount','GET')
    .then(response => {
      this.shared.setContentCount(response.data);
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

  getContentsByPaging(pageNumber:number) : void {
    this.requestService.sendRequest('api/Contents/GetAllWithPages?PageSize='+this.numberOfContentsInPerPage+'&PageNumber='+pageNumber,'GET')
    .then(response => {
      this.contents = response.data;
      if (this.shared.getHowList()!=3){
        this.ngOnInit();
      }
    })
    .catch(err => {
      console.error("Error: " + err);
    })
    
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
    if(this.shared.getHowList()==1){
      this.getContentsByComment((this.route.snapshot.params['id']));
      this.invisiblePagination(false);
    }else if(this.shared.getHowList()==2){
      this.getContentsByImpression((this.route.snapshot.params['id']));
      this.invisiblePagination(false);
    }else if(this.shared.getHowList()==0){
      this.getContentsByEditor((this.route.snapshot.params['id']));
      this.invisiblePagination(false);
    }else if(this.shared.getHowList()==3){
      //this.getContents();
      this.invisiblePagination(true);
      this.getContentsByPaging(this.selectedPage-1);
    }
  }

}
