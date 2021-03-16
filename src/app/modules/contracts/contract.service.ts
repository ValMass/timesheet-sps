import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Contract } from '@app/modules/contracts/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(
    private http: HttpClient
    ) { }

  getAllContracts(){
   //console.log('allcontracts');
    
    const url = environment.apiUrl + 'contract/listAllContract.php';
    return this.http.get<Contract[]>(url);
  }

  createNewContract(contract){
   
    const url = environment.apiUrl + 'contract/createContract.php';
    return this.http.post(url, contract);
  }

  updateContract(contract){
    const url = environment.apiUrl + 'contract/updateContractById.php';
    return this.http.post(url, contract );
  }

  //pass id directly instead of entire object
  deleteContract(contractId) {
    const url = environment.apiUrl + 'contract/deleteContractById.php';
    return this.http.post(url, {id:contractId });
  }

}
