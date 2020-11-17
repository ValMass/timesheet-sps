import { CalendarEvent, CalendarEventAction } from 'angular-calendar';

export interface NewCalendarEvent extends CalendarEvent  {
    title: string;
    start: Date;
    nOre: string;
    actions: CalendarEventAction[];
    codiceFatt: string;
    nProtocollo: string;
    activityId: string;
    smartWorking: number;
    contractCode: string;
}
