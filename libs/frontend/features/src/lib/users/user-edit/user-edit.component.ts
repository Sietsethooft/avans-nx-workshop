import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '@avans-nx-workshop/backend/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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
}