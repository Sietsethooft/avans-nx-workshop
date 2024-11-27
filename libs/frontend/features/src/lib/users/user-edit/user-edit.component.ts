import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '@avans-nx-workshop/backend/user';
import { Subscription } from 'rxjs';
import { UserGender} from '@avans-nx-workshop/shared/api';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'avans-nx-workshop-user-edit',
    templateUrl: './user-edit.component.html',
    styles: [],
    providers: [UserService, DatePipe]
})
export class UserEditComponent implements OnInit, OnDestroy {
    userId: string | null = null;
    user: User = {} as User;
    sub: Subscription = new Subscription();
    genders = Object.values(UserGender);

    formattedBirthDate: string = ''; // Houd de geformatteerde waarde als string.

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params: any) => {
            this.userId = params.get('id');
            if (this.userId) {
                this.sub = this.userService.getUserByIdAsync(this.userId).subscribe((user: User) => {
                    this.user = user;
                    if (this.user.birthDate) {
                        this.formattedBirthDate = this.datePipe.transform(this.user.birthDate, 'dd-MM-yyyy')!;
                    }
                });
            }
        });
    }   
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSave() {
        if (this.userId) {
            if (this.formattedBirthDate) {
                const [day, month, year] = this.formattedBirthDate.split('-');
                this.user.birthDate = new Date(+year, +month - 1, +day);
            }
    
            this.userService.updateUser(this.userId, this.user).subscribe(() => {
                this.router.navigate(['/users']);
            });
        }
    }
    
}    