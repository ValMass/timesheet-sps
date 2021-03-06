import { CalendarEvent, CalendarEventAction } from 'angular-calendar';

export interface NewCalendarEvent extends CalendarEvent  {
    title: string;
    start: Date;
    nOre: string;
    actions: CalendarEventAction[];
    codiceFatt: string;
    numProtocollo: string;
    activityId: string;
    smartWorking: number;
    contractCode: string;
    customerId: string;
    customerList?: Array<any>;
    customerName?: string;
    internalName?: string;
    internalRuolo?: string;
    internalId?: string;
    destinazione?: string;
    atyid?: string;
    atydescr?: string;
    atyname?: string;
}
