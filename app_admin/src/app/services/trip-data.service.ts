import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private url = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}/${code}`);
  }

  addTrip(trip: Trip): Observable<any> {
    return this.http.post(this.url, trip);
  }

  updateTrip(trip: Trip): Observable<any> {
    return this.http.put(
      `${this.url}/${trip.code}`,
      trip
    );
  }
}