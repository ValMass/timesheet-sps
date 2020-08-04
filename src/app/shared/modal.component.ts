import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    template: ` <div class="modal" [ngClass]="{ 'is-active': this.isOpen }">
    <!-- <div class="modal-background"></div> -->
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
  </div>`
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