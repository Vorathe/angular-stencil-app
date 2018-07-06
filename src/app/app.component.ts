import {Component, OnInit, ElementRef} from '@angular/core';
import * as faker from 'faker';
export interface DropdownData {
  image: string;
  description: string;
}
export interface DropdownElement extends Element {
  toggleDropdown: () => {};
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dropdownData: DropdownData[] = [];
  dropdownRef: DropdownElement;
  selectedItem: DropdownData;
  constructor(private elem: ElementRef) {}
  createData(numItems: number): void {
    for (let i = 0; i < numItems; i++) {
      this.dropdownData.push({
        image: 'https://picsum.photos/720?' + i,
        description: faker.lorem.sentences(1,3)
      });
    }
  }
  toggleDropdown(index: number) {
    this.dropdownRef.toggleDropdown();
    this.selectedItem = this.dropdownData[index];
    console.log(this.selectedItem);
  }
  handleCallback(event) {
    console.log(event);
  }
  ngOnInit() {
    this.createData(3);
    this.dropdownRef = this.elem.nativeElement.querySelector('ui-dropdown#uniqueDropdown');
  }
}
