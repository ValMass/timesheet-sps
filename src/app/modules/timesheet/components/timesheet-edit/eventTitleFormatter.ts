import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';

@Injectable()
export class EventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }
  private tradMap: Map<string, string> =
    new Map([
        ['LAVORO', 'Lavoro ordinario' ],
        ['SEDE', 'Attività interna'],
        ['PERMNON', 'Permesso non retribuito' ],
        ['PERMESS', 'Permesso generico'],
        ['MALATT', 'Malattia' ],
        ['LUTTO', 'Lutto parente'],
        ['AVIS', 'Donazione sangue' ],
        ['FERIE', 'Ferie'],
        ['MATALA', 'Allattamento' ],
        ['ASPETT', 'Aspettativa'],
        ['ELETTO', 'Permesso elettorale' ],
        ['FESTSOP', 'Festivita soppresse'],
        ['MATERN', 'Maternita' ],
        ['MATFAC', 'Maternita facoltativa'],
        ['MALFIG', 'Malattia figlio' ],
        ['MATRIMO', 'Matrimonio'],
        ['PARTIME', 'Tempo parziale' ],
        ['PATRONO', 'Patrono'],
        ['UNIVERS', 'Assenza esami universitari' ],
    ]);
  // you can override any of the methods defined in the parent class

  month(event: CalendarEvent): string {
    return `</b> ${this.tradMap.get(event.title)} numero ore ${event['nOre']}`;
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
}
