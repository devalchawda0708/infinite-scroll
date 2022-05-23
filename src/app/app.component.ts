import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { InfiniteScrollServiceService } from './infinite-scroll-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'infinite-scroll';
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: any;

  alSub: any;

  airlines: any = [];

  totalPages: any;
  currentPage: number = 0;

  observer: any;

  constructor(public serv: InfiniteScrollServiceService) {}

  ngOnInit() {
    this.getAirlines();
    this.intersectionObserver();
  }

  getAirlines() {
    this.alSub = this.serv.getAS(this.currentPage).subscribe((d) => {
      this.totalPages = d.totalPages;
      d.data.forEach((element: any) => {
        this.airlines.push(element);
      });
    });
  }

  ngAfterViewInit() {
    this.theLastList.changes.subscribe((d: any) => {
      if (d.last) this.observer.observe(d.last.nativeElement);
    });
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.getAirlines();
        }
      }
    }, options);
  }
}
