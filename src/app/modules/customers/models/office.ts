export class Office {
  id: number;
  address: string;
  city: string;
  cap: string;
  companyid: number;

  fromResponse(obj){
  this.id = obj.id;
  this.address = obj.address;
  this.city = obj.city;
  this.cap = obj.cap;
  this.companyid = obj.companyid;
  }
}
