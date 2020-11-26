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
}
