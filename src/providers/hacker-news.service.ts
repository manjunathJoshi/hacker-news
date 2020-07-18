import {Injectable}  from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, } from 'rxjs';
import { map, mergeMap } from "rxjs/operators";
import { UtilsService } from './utils.service';
import { forkJoin } from 'rxjs'; 
import { ALL_CATEGORIES} from './constants';

@Injectable()
export class HackerNewsService {

    private url = "https://hacker-news.firebaseio.com/v0/";

    public bookmarkArray:any=[];
    private messageSource = new BehaviorSubject({});
    currentMessage = this.messageSource.asObservable();


    constructor(private http: HttpClient,private UtilsService:UtilsService) {}


    getCategoryList(type) {
        const url = this.getRequestListUrl(type);
        return this.http.get(url).pipe(map((res) => res));
    }

    getRequestListUrl = (type) => this.url+type+'.json';
    getRequestItemUrl = (id) => this.url+'item/'+id+'.json';

    getcategoryItem(id) {
        const url = this.getRequestItemUrl(id);
        return this.http.get(url).pipe(map((res) => res));
    }

    getAllCategoryRequestItems(type) {
        this.http.get(this.getTypeUrl(type)).pipe(
        mergeMap((ids:any) => forkJoin(ids.map((id) => this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)))),
        ).subscribe((stories) => {
            this.UtilsService.setCategoryItemData(type,stories);
            this.changeMessage({stories});
        });
    }

    getTypeUrl(type){
        return `https://hacker-news.firebaseio.com/v0/${type}.json?orderBy="$key"&limitToFirst=30`;
    }

    changeMessage(val) {
        this.messageSource.next(val)
    }

    getItemsBycount(count,type) {
        count = 1;
        this.http.get(this.getTypeUrl(type)).pipe(
            mergeMap((ids:any) => forkJoin(ids.map((id) => this.http.get(`https://hacker-news.firebaseio.com/v0/${type}.json?orderBy="$key"&limitToFirst=${count}`)))),
            ).subscribe((stories) => {
                this.UtilsService.setCategoryItemData(type,stories);
                this.changeMessage({stories});
            });
    }

    loadAllCategoriesData(){
        for(let i=0;i<ALL_CATEGORIES.length;i++){
            this.http.get(this.getTypeUrl(ALL_CATEGORIES[i])).pipe(
                mergeMap((ids:any) => forkJoin(ids.map((id) => this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)))),
                ).subscribe((stories) => {
                    this.UtilsService.setCategoryItemData(ALL_CATEGORIES[i],stories);
                    this.changeMessage({stories});

                });
        }
    }

}