import { User } from '@app/models/user';
import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '@app/services/authentication.service';

@Injectable()
export class EventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string, private authenticationService : AuthenticationService) {
    super();
  }
  private tradMap: Map<string, string> =
    new Map([
      ['LAVORO', 'Lavoro ordinario'],
      ['SEDE', 'Attività interna'],
      ['PERMNON', 'Permesso non retribuito'],
      ['PERMESS', 'Permesso generico'],
      ['MALATT', 'Malattia'],
      ['LUTTO', 'Lutto parente'],
      ['AVIS', 'Donazione sangue'],
      ['FERIE', 'Ferie'],
      ['MATALA', 'Allattamento'],
      ['ASPETT', 'Aspettativa'],
      ['ELETTO', 'Permesso elettorale'],
      ['FESTSOP', 'Festivita soppresse'],
      ['MATERN', 'Maternita'],
      ['MATFAC', 'Maternita facoltativa'],
      ['MALFIG', 'Malattia figlio'],
      ['MATRIMO', 'Matrimonio'],
      ['PARTIME', 'Tempo parziale'],
      ['PATRONO', 'Patrono'],
      ['UNIVERS', 'Assenza esami universitari'],
      ['P104', 'Permesso legge 104']
    ]);

  private tradMapFat: Map<string, string> =
    new Map([
      ['01', 'Ordinarie fatturabili'],
      ['02', 'Straordinarie fatturabili'],
      ['03', 'Straordinarie festive '],
      ['04', 'Straordinarie notturne'],
      ['NF', 'Non fatturabili'],
      ['RP', 'Reperibilità'],
      ['IN', 'Intervento'],
      ['TR', 'Trasferta'],
    ]);
  // you can override any of the methods defined in the parent class
  month(event: any): string {
    let res = '';
    if (event.title === 'MALATT') {
      res = `</b> ${this.tradMap.get(event.title)} numero ore ${event['nOre']} - protocollo: ${event.numProtocollo}`;
    } else {
      if (this.tradMapFat.get(event.codiceFatt) && (event.title != 'SEDE')) {
        res = `</b> ${this.tradMap.get(event.title)} numero ore ${event['nOre']} ${this.tradMapFat.get(event.codiceFatt)} per ${event['customerName']}`;
        if(this.getRoleFromLocalStorage() != "2"){
          res = res + ' di tipo ' + event["atydescr"] + ' '
        }
      } else {
        if (event.title != 'SEDE') {
          res = `</b> ${this.tradMap.get(event.title)} numero ore ${event['nOre']}`;
        }else{
          res = `</b> ${this.tradMap.get(event.title)} numero ore ${event['nOre']} ${this.tradMapFat.get(event.codiceFatt)} su ${event.internalName} come ${event.internalRuolo}`;
        }
      }
      if(event.smartWorking == 1){
        res = res + ' in Smart Working'
      }
    }
    if(event.title === 'TRASFRIMB'){
      res=`</b> Trasferta ${event.customerName} a ${event.destinazione}`;
    }

    return res;
  }

  week(event: CalendarEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
      'h:m a',
      this.locale
    )}</b> ${event.title}`;
  }

  day(event: CalendarEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
      'h:m a',
      this.locale
    )}</b> ${event.title}`;
  }

  getRoleFromLocalStorage() {
    const user: User = this.authenticationService.currentUserValue;
    return user.role;
  }
}
