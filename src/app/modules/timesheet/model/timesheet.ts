export interface Timesheet {
  id?: string;
  month: number;
  year: number;
  userid: string;
  state: string;
  dayjson?: Array<any>;
  validatedbyadmin?: string;
  validatebyadmintimestamp?: string;
  validatebyuser?: string;
  validatebyusertimestamp?: string;
  validatebyfinal?: string;
  validatebyfinaltimestamp?: string;
  workeddays?: string;
  workedhours?: string;
  deseaseday?: string;
  livingexpense?: string;
  travelexpense?: string;
  variousexpanse?: string;
  permessihours?: string;
  pemessiextra?: string;
  smartworkday?: string;
  parentalleave?: string;
  holiydaysday?: string;
  overtime?: string;
  nightovertime?: string;
  festalovertime?: string;
  maternitydays?: string;
  weddingdays?: string;
  diaria?: string;
  trasferte?: string;
  ticket?: string;
  ticketnumber?: string;
  distaccato?: string;
}
