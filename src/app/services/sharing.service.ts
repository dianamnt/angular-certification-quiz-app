import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private data$ = new Subject<string>;

  constructor() {}

  getData() {
    return this.data$.asObservable();
  }

  setData(data: string) {
    this.data$.next(data);
  }
}
