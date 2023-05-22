import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  constructor(private sharingService: SharingService) {}

  ngOnInit() {
    console.log('intra in init');
    this.sharingService.getData().subscribe((data) => {
      console.log('ceva orice plm');
      console.log(data);
    });
  }
}
