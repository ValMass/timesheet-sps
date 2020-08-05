import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-card-content',
    template: `
    <div class="card-body">
      <!-- <div class="id">{{ id }}</div> -->
        <div class="name">{{ name }}</div>
        <div class="address">{{ address }}</div>
        <div class="piva">{{ piva }}</div>
        <div class="rea">{{ rea }}</div>
        <div class="posta">{{ posta }}</div>
        <div class="referente">{{ referente }}</div>
    </div>
  `
})
export class CardContentComponent implements OnInit {
    @Input() id;
    @Input() name;
    @Input() address;
    @Input() piva;
    @Input() rea;
    @Input() posta;
    @Input() referente;

    ngOnInit() { }
}
