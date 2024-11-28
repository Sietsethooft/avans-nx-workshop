import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandService } from '../band-service';
import { IBand } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-band-details',
    templateUrl: './band-details.component.html',
    styles: []
})
export class BandDetailsComponent implements OnInit {
    bandId: string | null = null;
    band: IBand | null = null;

    constructor(
        private route: ActivatedRoute,
        private bandService: BandService,
        private router: Router
    ) {}

    ngOnInit(): void {
        console.log('BandDetailsComponent.ngOnInit');

        this.route.paramMap.subscribe((params) => {
            this.bandId = params.get('id');
            console.log('bandId: ', this.bandId);

            this.bandService
                .getBandByIdAsync(this.bandId).subscribe((band: IBand) => {
                    this.band = band;
                    console.log('result: ', this.band); 
                });
        });
    }

    deleteBand(): void {
        // if (this.bandId) {
        //     this.bandService.deleteBand(this.bandId).subscribe(() => {
        //         this.router.navigate(['/bands']);
        //     });
        // }
    }

    confirmDelete() {
        this.deleteBand();
    }
}