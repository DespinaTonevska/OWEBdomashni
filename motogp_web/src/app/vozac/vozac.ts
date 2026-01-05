import { Component, Input } from '@angular/core';
import { shofer } from '../shofer';

@Component({
  selector: 'app-vozac',
  imports: [],
  templateUrl: './vozac.html',
  styleUrl: './vozac.css',
})
export class Vozac {
  @Input()
  motordzija:shofer | undefined;

  @Input()
  indeks:Number=0;

  funk() {
    console.log("Button Clicked");
  }
}