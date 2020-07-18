import {Injectable}  from '@angular/core';

@Injectable()
export class UtilsService {

    public topstories: any = [];
    public newstories: any = [];
    public beststories: any = [];
    public askstories: any = [];
    public showstories: any = [];
    public jobstories: any = [];

    public topstoriesList: any = [];
    public newstoriesList: any = [];
    public beststoriesList: any = [];
    public askstoriesList: any = [];
    public showstoriesList: any = [];
    public jobstoriesList: any = [];

    setCategoryList(type,valueList){
        switch (type){
            case 'topstories':
                this.topstoriesList = [...this.topstoriesList,...valueList];
                break;
            case 'newstories':
                this.newstoriesList = [...this.newstoriesList,...valueList];
                break;
            case 'beststories':
                this.beststoriesList = [...this.beststoriesList,...valueList];
                break;
            case 'askstories':
                this.askstoriesList = [...this.askstoriesList,...valueList];
                break;
            case 'showstories':
                this.showstoriesList = [...this.showstoriesList,...valueList];
                break;
            case 'jobstories':
                this.jobstoriesList = [...this.jobstoriesList,...valueList];
                break;
        }

    }
    getCategoryList(type){
        switch (type){
            case 'topstories':
                return this.topstoriesList;
            case 'newstories':
                return this.newstoriesList;
            case 'beststories':
                return this.beststoriesList;
            case 'askstories':
                return this.askstoriesList;
            case 'showstories':
                return this.showstoriesList;
            case 'jobstories':
                return this.jobstoriesList;
            default :
                return [];
        }

    }

    setCategoryItemData(type,data){
        switch (type){
            case 'topstories':
                this.topstories = [...this.topstories,data];
                // localStorage.setItem(type,JSON.stringify(this.topstories));
                break;
            case 'newstories':
                this.newstories = [...this.newstories,data];
                // localStorage.setItem(type,JSON.stringify(this.newstories));
                break;
            case 'beststories':
                this.beststories = [...this.beststories,data];
                // localStorage.setItem(type,JSON.stringify(this.beststories));
                break;
            case 'askstories':
                this.askstories = [...this.askstories,data];
                // localStorage.setItem(type,JSON.stringify(this.askstories));
                break;
            case 'showstories':
                this.showstories = [...this.showstories,data];
                // localStorage.setItem(type,JSON.stringify(this.showstories));
                break;
            case 'jobstories':
                this.jobstories = [...this.jobstories,data];
                // localStorage.setItem(type,JSON.stringify(this.jobstories));
                break;
        }

    }

    getCategoryItemData(type){
        switch (type){
            case 'topstories':
                return this.topstories;
            case 'newstories':
                return this.newstories;
            case 'beststories':
                return this.beststories;
            case 'askstories':
                return this.askstories;
            case 'showstories':
                return this.showstories;
            case 'jobstories':
                return this.jobstories;
            default :
                return [];
        }
    }
}
