import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  cv: string;
  subscription: Subscription = new Subscription();
  constructor(private sharingService: SharingService) {}

  ngOnInit() {
    this.subscription.add(
      this.sharingService.currentData$.subscribe((data) => {
        this.cv = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
