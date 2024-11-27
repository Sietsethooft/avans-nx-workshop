import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserInfo, UserGender, UserRole } from "@avans-nx-workshop/shared/api";
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUserInfo[] | undefined = undefined;
  sub?: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('UserListComponent.ngOnInit');
        
    this.userService
    .getUsersAsync()
    .subscribe(
      (users) => (this.users = users)
    );
  }

  ngOnDestroy(): void {
    if (this.sub){
      console.log('UNSUBSCRIBE');
      this.sub.unsubscribe();
    }
    console.log('UserListComponent.ngOnDestroy');
  }
}

