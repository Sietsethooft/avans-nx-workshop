import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IUserInfo, UserGender, UserRole } from "@avans-nx-workshop/shared/api";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly users: IUserInfo[] = [
    {
                _id: '1',
                name: 'John Doe',
                emailAddress: 'j.doe@outlook.com',
                role: UserRole.Unknown,
                gender: UserGender.Unknown,
                password: 'secret',
                isActive: true,
                profileImgUrl: "url"
            },
            {
                _id: '2',
                name: 'Jane Doe',
                emailAddress: 'j.doe2@outlook.com',
                role: UserRole.Unknown,
                gender: UserGender.Unknown,
                password: 'secret',
                isActive: true,
                profileImgUrl: "url"
            }
  ];

  constructor() {
    console.log('Service constructor aangeroepen');
  }

  getUsers(): IUserInfo[] {
    console.log('getUsers aangeroepen');
    return this.users;
  }

  getUsersAsObservable(): Observable<IUserInfo[]> {
    console.log('getUsersAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.users);
  }
  
  getUsersAsync(): Observable<IUserInfo[]> {
    console.log('getUsersAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.users).pipe(delay(2000));
  }

  getUserById(id: string | null): IUserInfo {
    console.log('getUserById aangeroepen');
    return this.users.filter((user) => user._id === id)[0];
  }

  getuserByIdAsync(id: string | null): Observable<IUserInfo> {
    console.log('getUserByIdAsync aangeroepen');
    return of(this.users.filter((user) => user._id === id)[0]).pipe(delay(2000));
  }
}
