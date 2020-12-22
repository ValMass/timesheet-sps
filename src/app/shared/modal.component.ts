import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: ` 
    <div class="modal" [ngClass]="{ 'show' : this.isOpen }">
    <div class="modal-dialog modal-dialog-centered" >    
      <div class="modal-content">
      <header class="modal-header">
        <p class="modal-title">{{(hasFooter == true) ? 'Confirm' : 'Alert' }}</p>
      </header>
      <section class="modal-body">
        {{message}}
      </section>
      <footer class="modal-footer">
        <button class="btn" (click)="onNo()">{{(hasFooter == true) ? 'No' : 'Close' }}</button>
        <button class="btn" *ngIf="hasFooter" (click)="onYes()">Yes</button>
      </footer>
  </div>
</div>
  </div>`,
  styles:[`.modal{

  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

  }`]
})

export class ModalComponent {
  @Input() message;
  @Input() isOpen = false;
  @Output() handleYes = new EventEmitter();
  @Output() handleNo = new EventEmitter();
  @Input() hasFooter = true;

  constructor() { }


  onNo = () => {
    this.handleNo.emit();
  }

  onYes = () => {
    this.handleYes.emit();
  }
}