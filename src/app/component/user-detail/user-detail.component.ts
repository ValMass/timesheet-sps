import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  //contractForm
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
      console.log('Data umpa :', data);
      console.log('diobestia :', data.user );
      console.log('status :', data.user.status);


      const birth = new Date(data.user.data.birthdate);


      this.profileForm = this.fb.group({
        firstName: [data.user.data.name],
        lastName: [data.user.data.surname],
        address: [data.user.data.address],

        email: [data.user.data.birthplace],
        tipologiacontratto: [data.user.data.contracttype],
        distaccatoa: [data.user.data.distaccatoa],
        sededilavoro: [data.user.data.sededilavoro],
        rimborsostimato: [data.user.data.valorerimborsistimato],
        buonipasto: [data.user.data.buonipastobool],
      });
    } );
  }
  

}
