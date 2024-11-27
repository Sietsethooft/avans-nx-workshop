import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '@avans-nx-workshop/backend/user';
import { Subscription } from 'rxjs';
import { UserGender} from '@avans-nx-workshop/shared/api';
declare var $: any;

@Component({
    selector: 'avans-nx-workshop-user-edit',
    templateUrl: './user-edit.component.html',
    styles: [],
    providers: [UserService]
})
export class UserEditComponent implements OnInit, OnDestroy {
    userId: string | null = null;
    user: User = {} as User;
    sub: Subscription = new Subscription();
    genders = Object.values(UserGender);

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params: any) => {
            this.userId = params.get('id');
            if (this.userId) {
                this.sub = this.userService.getUserByIdAsync(this.userId).subscribe((user: User) => {
                    this.user = user;
                });
            }
        });
    }

    ngAfterViewInit() {
        $('.datepicker').datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true
        }).on('changeDate', (e: any) => {
            this.user.birthDate = this.formatDate(e.date);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSave() {
        if (this.userId) {
            this.userService.updateUser(this.userId, this.user).subscribe(() => {
                this.router.navigate(['/users']);
            });
        }
    }

    private formatDate(date: Date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
}