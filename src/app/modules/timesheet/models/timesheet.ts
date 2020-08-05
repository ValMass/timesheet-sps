export interface Timesheet {
  id: string;
  month: string;
  year: string;
  dayJson?: string;
  validatedbyadmin: string;
  validationtimestamp: string;
  freezed: string;
  freezedtimestamp: string;
  totalworkeddays: string;
  totalworkedhours: string;
  totaldeseasehours: string;
  userid: string;
  state: string;
  totallivingexpense: string;
  totaltravelexpense: string;
  totalvariousexpanse: string;
}
