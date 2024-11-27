import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBand } from "@avans-nx-workshop/shared/api";
import { BandService } from '../band-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-band-list',
  templateUrl: './band-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BandListComponent implements OnInit, OnDestroy {
  bands: IBand[] | undefined = undefined;
  sub?: Subscription;

  constructor(private bandService: BandService) {}

  ngOnInit(): void {
    console.log('BandListComponent.ngOnInit');
        
    this.sub = this.bandService
      .getBandsAsync()
      .subscribe(
        (bands) => (this.bands = bands)
      );
  }

  ngOnDestroy(): void {
    if (this.sub){
      console.log('UNSUBSCRIBE');
      this.sub.unsubscribe();
    }
    console.log('BandListComponent.ngOnDestroy');
  }
}