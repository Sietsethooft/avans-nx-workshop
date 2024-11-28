import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandService } from '../band-service';
import { UserService } from '../../users/user.service';
import { IBand, IUserInfo } from '@avans-nx-workshop/shared/api';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-band-details',
    templateUrl: './band-details.component.html',
    styles: []
})
export class BandDetailsComponent implements OnInit {
    bandId: string | null = null;
    band: IBand | null = null;
    members: IUserInfo[] = [];
    leader: IUserInfo | null = null;

    constructor(
        private route: ActivatedRoute,
        private bandService: BandService,
        private userService: UserService,
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
                    this.loadMembers();
                    this.loadLeader();
                });
        });
    }

    loadMembers(): void {
        if (this.band && this.band.members) {
            const memberObservables = this.band.members.map(memberId => 
                this.userService.getUserByIdAsync(String(memberId))
            );

            forkJoin(memberObservables).subscribe((members: IUserInfo[]) => {
                this.members = members;
                console.log('members: ', this.members);
            });
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