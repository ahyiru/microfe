import { Component } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: '#angular-app',
  // templateUrl: './app.component.html',
  template:require('./app.component.html'),
  // styleUrls: ['./app.component.less'],
})
export class AppComponent {
  name='Hello Angular';
  logo=require('@common/images/angular.svg');
  constructor( private sanitizer: DomSanitizer ) {}
}
