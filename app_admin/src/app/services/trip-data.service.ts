import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  
  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    let url = 'http://localhost:4200/api/trips'; // adjust if needed
    return this.http.get<Trip[]>(url);
  }
}
