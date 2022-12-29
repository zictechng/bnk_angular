import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-success',
  templateUrl: './transfer-success.component.html',
  styleUrls: ['./transfer-success.component.css']
})
export class TransferSuccessComponent implements OnInit{

  constructor(){}


  ngOnInit(): void {
    localStorage.removeItem('transaction_id');
  }

}
