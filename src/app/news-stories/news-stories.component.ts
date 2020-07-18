import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from 'src/providers/hacker-news.service';
import { UtilsService } from 'src/providers/utils.service';
import { NEWS_CATEGORIES, SEARCH_CATEGORIES,LIMIT} from 'src/providers/constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-news-stories',
  templateUrl: './news-stories.component.html',
  styleUrls: ['./news-stories.component.scss']
})
export class NewsStoriesComponent implements OnInit {

  public data:Array<Object> = [];
  public dataList:any;
  public searchQuery:any;
  public queryData:any;
  public originalData;
  public selectedValue: any;
  public searchValue:any;
  public searchCategory:string;
  public categories:any = NEWS_CATEGORIES;
  public searchCategories:any = SEARCH_CATEGORIES;
  public limits:any = LIMIT;
  public limit;
  scrollCallback;
  public listCategory;
  public items = [];
  public scrollCount = 0;
  public initialItemCount:number= 0;
  public hashMap:Map<number,true> = new Map();
  private nextApiCountNumber:number = 3;
  private sortByVal:string = 'id';
  private scrollThreshold:number = 30;

  constructor(public HackerNewsService:HackerNewsService, public UtilsService:UtilsService,public snackBar:MatSnackBar) {

   }
  ngOnInit() {
    this.data = [];
    this.snackBar.open('Please wait while we are loading data fro you ','X',{
      duration:5000,verticalPosition: 'top', horizontalPosition: 'right',  panelClass: ['mat-warn']
    });
    this.snackBar.open('Note:click on icon AZ to sort by respective column  ','',{
      duration:5000,verticalPosition: 'top', horizontalPosition: 'center',  panelClass: ['mat-warn']
    });
    this.selectedValue = this.categories[1].value;
    this.searchCategory = this.searchCategories[2].value;
    this.limit  = this.limits[0].value;
    this.getListOfCategory();
    // this.getInitialValues()
    // this.HackerNewsService.getAllCategoryRequestItems(this.selectedValue);
    this.HackerNewsService.currentMessage.subscribe(val => {
      const arrayValues = this.UtilsService.getCategoryItemData(this.selectedValue);
      this.data = arrayValues[0];
      this.originalData = arrayValues[0];
    });
  }

  searchData() {
    if(!this.items.length) return;
    const queryData = this.items;
    const searchVal = this.searchCategory
    if(!this.searchQuery) this.items = this.originalData;
    let filteredItems = [];
    filteredItems = queryData.filter((o: any) => {
      if (!this.searchQuery) {
        return true;
      }
      if(o[searchVal] && 
        o[searchVal]
          .toString()
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())){
            return true;
      }
      return false;
    });
    this.items = filteredItems;
  }

  changedSelection(value){
    this.getData();
  }

  getData() {
    this.snackBar.open('Please wait while we are loading data for you ','',{
      duration:2000,verticalPosition: 'top', horizontalPosition: 'right',  panelClass: ['mat-warn']
    });
    this.items = [];
    if(this.UtilsService[this.selectedValue].length){
      this.items = this.UtilsService.getCategoryItemData(this.selectedValue);
      this.originalData = this.items
    }else{
      this.getListOfCategory()
    }
  }
  
  reset(){
    this.items = this.originalData;
  }
  getListOfCategory(){
    this.HackerNewsService.getCategoryList(this.selectedValue).subscribe(
      (data)=> {
        this.listCategory = data;
        this.getInitialdata(0,50)
      });
  }

  getInitialdata(from,end){
    let items = [];
    this.initialItemCount = end
    for(let i=from;i<end;i++){
      this.HackerNewsService.getcategoryItem(this.listCategory[i]).subscribe(
        (data:any)=>{
          if(!this.hashMap.get(data.id)){
            this.items.push(data);
            this.sortBy(this.sortByVal);
            this.hashMap.set(data.id,true);
            this.originalData = this.items
            this.UtilsService.setCategoryItemData(this.selectedValue,data);
          }
        }
      );
    }
  }

  scrolled(event){
    this.scrollCount ++;
    console.log("scrolled")
    if(this.scrollCount === this.scrollThreshold){
      this.scrollCount = 0;
      const from = this.initialItemCount;
      const to = this.initialItemCount+this.nextApiCountNumber;
      this.getInitialdata(from,to);
    }
  }

  sortBy(val){
    this.sortByVal = val;
    const sorted = this.items.sort((a,b)=>a[val] - b[val]);
    this.items = sorted;
  }
}
