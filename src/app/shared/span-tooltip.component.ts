import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-span-tooltip',
  templateUrl: './span-tooltip.component.html',
  styleUrls: ['./span-tooltip.component.css']
})
export class SpanTooltipComponent implements OnInit {

  @Input() state: any;

  constructor() { }

  ngOnInit(): void {
  }

  tooltip(state){
    let text;

    if(state === '1'){
      text="Timesheet in modifca"
    }
    else if(state === '2'){
      text ="Timesheet confermato dalla risorsa"
    }
    else if(state === '3'){
      text="Timesheet confermato Dall'amministratore"
    }
    else {
      text ="Timesheet non inizializzato"
    }

    return(text)
  }

}
