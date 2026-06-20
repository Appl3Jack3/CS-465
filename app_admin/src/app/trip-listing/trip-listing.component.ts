import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../services/trip-data.service';
import { trips } from '../data/trips';
import { Router } from '@angular/router';  
import { TripCardComponent } from '../trip-card/trip-card.component';

 
@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips: Array<any> = trips;
  message: string = '';

  constructor(private tripDataService: TripDataService, private router: Router) {
    console.log('trip-listing constructor');
  }
  public addTrip(): void {
    this.router.navigate(['add-trip']); 
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: any) => {
        this.trips = value;
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
        error: (error: any) => {
          console.error('Full Error:', error);
          console.error('Status:', error?.status);
          console.error('Status Text:', error?.statusText);
          console.error('Message:', error?.message);
          console.error('Response Body:', error?.error);
        }
    });
  }
}
