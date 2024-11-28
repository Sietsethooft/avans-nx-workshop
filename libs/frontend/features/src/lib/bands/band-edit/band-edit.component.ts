import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandService } from '../band-service';
import { UserService } from '../../users/user.service';
import { IBand, FrequencyRepetition, IUserIdentity, IUserInfo } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'avans-nx-workshop-band-edit',
  templateUrl: './band-edit.component.html',
  styles: [],
  providers: [BandService]
})
export class BandEditComponent implements OnInit, OnDestroy {
  bandId: string | null = null;
  band: IBand = {} as IBand;
  leader: IUserIdentity | undefined;
  sub: Subscription = new Subscription();
  frequencies = Object.values(FrequencyRepetition);
  bandForm: FormGroup;
  photoForm: FormGroup;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bandService: BandService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.bandForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      frequencyRepetition: ['', Validators.required],
      region: ['', [Validators.required, Validators.minLength(2)]],
      genres: ['', Validators.required],
      minAge: [0, Validators.min(0)],
      minExperience: [0, Validators.min(0)],
    });

    this.photoForm = this.fb.group({
      profileImgUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.bandId = params.get('id');

      if (this.bandId) {
        this.sub = this.bandService.getBandByIdAsync(this.bandId).subscribe({
          next: (band: IBand) => {
            this.band = band;
            this.isLoading = false;

            this.bandForm.patchValue({
              name: this.band.name,
              description: this.band.description,
              frequencyRepetition: this.band.frequencyRepetition,
              region: this.band.region,
              genres: this.band.genres.join(', '),
              minAge: this.band.minAge,
              minExperience: this.band.minExperience,
            });

            this.loadLeader();
          },
          error: () => {
            this.isLoading = true;
          },
        });
      } else {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSave() {
    if (this.bandForm.valid) {
      const formValues = this.bandForm.value;
      const genresArray = formValues.genres.split(',').map((genre: string) => genre.trim());

      const updatedBand: IBand = {
        ...this.band,
        ...formValues,
        genres: genresArray,
      };

      if (this.bandId) {
        this.bandService.updateBand(this.bandId, updatedBand).subscribe(() => {
          this.router.navigate(['/bands']);
        });
      } else {
        this.bandService.createBand(updatedBand).subscribe(() => {
          this.router.navigate(['/bands']);
        });
      }
    }
  }

  updatePhoto() {
    if (this.photoForm.valid) {
      const newUrl = this.photoForm.value.profileImgUrl;
      this.band.profileImgUrl = newUrl;
    }
  }

  loadLeader(): void {
    if (this.band && this.band.leader) {
      this.userService.getUserByIdAsync(String(this.band.leader)).subscribe((leader: IUserInfo) => {
        this.leader = leader;
        console.log('leader: ', this.leader);
      });
    }
  }
}