interface Mat {
  id: string;
  officesid: string;
  customerofficeid: string;
  secondofficeid: string;
  distance: string;
}

interface Cus {
  id: string;
  address: string;
  city: string;
  cap: string;
  customerid: string;
}

export interface CustomerOfficeMatrix {
  mat: Mat;
  cus: Cus;
}