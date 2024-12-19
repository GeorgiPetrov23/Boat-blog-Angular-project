import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Boat, BoatForCreate } from '../../types/Boat';
import { User } from '../../types/User';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  boats: Boat[] = [];
  
  constructor(private apiService: ApiService){}
  
  ngOnInit(): void {
    this.apiService.getBoats().subscribe((boats) => {
      console.log(boats);
      this.boats = boats;
    })
  }
}
