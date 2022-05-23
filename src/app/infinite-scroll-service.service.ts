import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollServiceService {

  constructor(private httpclient: HttpClient) {}

  getAS(page: number): Observable<any> {
    return this.httpclient
      .get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=50`)
  }
}
