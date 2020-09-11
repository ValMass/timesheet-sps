export class Timesheet {
  id: string;
  month: string;
  year: string;
  dayJson?: Array<any>;
  validatedbyadmin?: string;
  validationtimestamp?: string;
  freezed?: string;
  freezedtimestamp?: string;
  totalworkeddays?: string;
  totalworkedhours?: string;
  totaldeseasehours?: string;
  userid: string;
  state: string;
  totallivingexpense?: string;
  totaltravelexpense?: string;
  totalvariousexpanse?: string;

  fromObject(obj){
    this.id = obj.id;
    this.month = obj.month;
    this.year = obj.year;
    this.dayJson = JSON.parse(obj.dayjson);
    this.validatedbyadmin = obj.validatedbyadmin;
    this.validationtimestamp = obj.validationtimestamp;
    this.freezed = obj.freezed;
    this.freezedtimestamp = obj.freezedtimestamp;
    this.totalworkeddays = obj.totalworkeddays;
    this.totalworkedhours = obj.totalworkedhours;
    this.totaldeseasehours = obj.totaldeseasehours;
    this.userid = obj.userid;
    this.state = obj.state;
    this.totallivingexpense = obj.totallivingexpense;
    this.totaltravelexpense = obj.totaltravelexpense;
    this.totalvariousexpanse = obj.totalvariousexpanse;
  }
}
