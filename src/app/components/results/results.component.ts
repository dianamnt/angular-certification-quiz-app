import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.sharingSerivce.currentData$.subscribe((data) => {
    //   console.log(data);
    // });
  }
}
