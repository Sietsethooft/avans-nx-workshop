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

    // Synchrone manier: geen zichtbare vertraging
    // this.users = this.userService.getUsers();

    // Asynchroon: met reactive programming
    
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

    // users: IUserInfo[] = [
    //     {
    //         _id: '1',
    //         name: 'John Doe',
    //         emailAddress: 'j.doe@outlook.com',
    //         role: UserRole.Unknown,
    //         gender: UserGender.Unknown,
    //         password: 'secret',
    //         isActive: true,
    //         profileImgUrl: "url"
    //     },
    //     {
    //         _id: '2',
    //         name: 'Jane Doe',
    //         emailAddress: 'j.doe2@outlook.com',
    //         role: UserRole.Unknown,
    //         gender: UserGender.Unknown,
    //         password: 'secret',
    //         isActive: true,
    //         profileImgUrl: "url"
    //     }
    // ]
}

