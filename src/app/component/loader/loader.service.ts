import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  showLoader = new Subject<boolean>();

  constructor() {}

  show(): void {
    this.showLoader.next(true);
  }

  hide(): void {
    this.showLoader.next(false);
  }
}
