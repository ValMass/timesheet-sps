import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: ` 
    <div class="modal" [ngClass]="{ 'show' : this.isOpen }">
    <div class="modal-dialog modal-dialog-centered" >    
      <div class="modal-content">
      <header class="modal-header">
        <p class="modal-title">Confirm</p>
      </header>
      <section class="modal-body">
        {{message}}
      </section>
      <footer class="modal-footer">
        <button class="btn" (click)="onNo()">No</button>
        <button class="btn" (click)="onYes()">Yes</button>
      </footer>
  </div>
</div>
  </div>`,
  styles:[`.modal{

  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

  }`]
})

export class ModalComponent implements OnInit {
  @Input() message;
  @Input() isOpen = false;
  @Output() handleYes = new EventEmitter();
  @Output() handleNo = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log('modalinit');

  }

  onNo = () => {
    this.handleNo.emit();
  }

  onYes = () => {
    this.handleYes.emit();
  }
}