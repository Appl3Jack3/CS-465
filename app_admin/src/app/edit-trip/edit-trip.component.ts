import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {

  editForm!: FormGroup;
  submitted = false;
  tripCode!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {

    // 1. get code from URL
    this.tripCode = this.route.snapshot.paramMap.get('code')!;

    // 2. build form
    this.editForm = this.formBuilder.group({
      _id:[],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // 3. load trip data
    this.tripService.getTrip(this.tripCode).subscribe({
      next: (trip) => {
        this.editForm.patchValue(trip);
      },
      error: (err) => {
        console.log('Error loading trip:', err);
      }
    });
  }

  // helper
  get f() {
    return this.editForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) return;

    this.tripService.updateTrip(this.editForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Update error:', err);
      }
    });
  }
}