import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DropdownDirective } from './dropdown.directive';

import { DataStorageService } from './recipes/datastorage.service';


@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorage: DataStorageService) { }

  ngOnInit() {
  }

  onSaveData(){
    this.dataStorage.storeRecipes()
    .subscribe(
      (response: Response) => console.log(response)
    );
  }

  onFetchData(){
    this.dataStorage.getRecipes();
  }

}
