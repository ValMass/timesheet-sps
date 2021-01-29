import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-footer',
  template: `
    <button
      class="btn btn-custom w-50 shadow-none"
      [ngClass]="className"
      [attr.aria-label]="label"
      tabindex="0"
      [disabled]=disabledButton  
      [attr.data-id]="item.id"
      (click)="handleClick()"
    >
      <i [ngClass]="iconClasses"></i> <span>{{ label }}</span>
    </button>
  `,
  styles:['.btn:hover{color:#962d37}; button:focus{outline: none !important}']
})
export class ButtonFooterComponent implements OnInit {
  @Input() label;
  @Input() className;
  @Input() iconClasses;
  @Input() item;
  @Input() dataId;
  @Input() disabledButton;

  @Output() clicked = new EventEmitter<any>();

  ngOnInit() {
  }

  handleClick() {
    this.clicked.emit(this.item);
  }
}
