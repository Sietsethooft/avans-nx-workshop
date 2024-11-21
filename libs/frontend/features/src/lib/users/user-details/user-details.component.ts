import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { IUserInfo } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})
export class UserDetailsComponent implements OnInit{
    userId: string | null = null;
    user: IUserInfo | null = null;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
      ) {}

    ngOnInit(): void {
      console.log('UserDetailsComponent.ngOnInit');

      this.route.paramMap.subscribe((params) => {
          this.userId = params.get('id');
          console.log('userId: ', this.userId);

          this.userService
          .getUserByIdAsync(this.userId).subscribe((user: IUserInfo) => {
              this.user = user;
              console.log('result: ', this.user); 
          });
        });
    }
}
