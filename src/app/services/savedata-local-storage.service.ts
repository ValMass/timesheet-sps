import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedataLocalStorageService {

  constructor() { }

  setValueLocalStorage( key : string , value : any ){
    localStorage.setItem(key , JSON.stringify(value))
  }

  getValueLocalStorage(key : string){
    let res = localStorage.getItem(key)
    return(res != null && res != undefined ? JSON.parse(res) : null);
  }

  cleanValueStorage(key : string){
    localStorage.removeItem(key);
  }
  
}
