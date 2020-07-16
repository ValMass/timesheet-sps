import { Deserializable } from '@app/models/deserializable';

export class AnagraphicData implements Deserializable {
  address: string;
  birthdate: string;
  birthplace: string;
  buonipastobool: string;
  contracttype: string;
  distaccatoa: string;
  distaccatoda: string;
  id: string;
  name: string;
  regnuminps: string;
  sededilavoro: string;
  sex: string;
  surname: string;

  valorerimborsistimato: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
  myaddress(){
    return this.address;
  }
}
