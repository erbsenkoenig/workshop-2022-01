import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  count = 0;

  constructor() {}

  ngOnInit(): void {}

  increase() {
    this.count = this.count + 1;
  }

  decrease() {
    if (this.count > 0) {
      this.count = this.count - 1;
    }
  }
}
