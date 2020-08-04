import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CurrentDataService {

    private data:any={};

    private dataSubject=new BehaviorSubject(this.data);
    currentData=this.dataSubject.asObservable();

    constructor() { }

    changeSubprojectDetails(data:any){
    
        this.dataSubject.next(data);
      }
    
}

