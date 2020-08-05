import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'list-header',
    template: `
    <div class="content-title-group" style="padding-left:0.5rem">
      <a router-link="/">
        <h1 class="header-title">{{title}}</h1>
      </a>
      <button
        class="btn"
        (click)="handleAdd()"
        aria-label="add"
      >
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>

      <!-- dont need refresh now,maybe uncomment later -->
      <!-- <button
        class="button refresh-button"
        (click)="handleRefresh()"
        aria-label="refresh"
     
        <i class="fas fa-sync" aria-hidden="true"></i>
      </button> > -->
    </div>
  `,
    styles: [
        ` 
        div{
            display:flex;
        }
        button{
       padding:0;
    }
    button{
        margin-left:1.5rem;
    }
    i{
        transition: all 0.3s;
       
    }
    i:hover{
    transform: scale(1.1);
    color: #962D37;
  }
    h1{
        margin:0;    }
    `
    ]

})
export class ListHeaderComponent implements OnInit {
    @Input() title: string;
    @Output() add = new EventEmitter();
    
    //@Output() refresh = new EventEmitter();

    ngOnInit() { }

    handleAdd() {
        this.add.emit();
    }

    // handleRefresh() {
    //     this.refresh.emit();
    // }
}
