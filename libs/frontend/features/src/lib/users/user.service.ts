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
      name: 'Sietse Hooft',
      emailAddress: 's.Hooft@outlook.com',
      role: UserRole.Unknown,
      gender: UserGender.Unknown,
      password: 'SietsHooft',
      isActive: true,
      profileImgUrl: "https://picsum.photos/id/1/200/300"
    },
    {
      _id: '2',
      name: 'Merel van Dijk',
      emailAddress: 'm.Dijk2@outlook.com',
      role: UserRole.Guest,
      gender: UserGender.Unknown,
      password: 'MerelDijk',
      isActive: true,
      profileImgUrl: "https://picsum.photos/id/22/200/300"
    },
    {
      _id: '3',
      name: 'Jan de Vries',
      emailAddress: 'j.devries@outlook.com',
      role: UserRole.Admin,
      gender: UserGender.Male,
      password: 'JanVriesland',
      isActive: true,
      profileImgUrl: "https://picsum.photos/id/27/200/300"
    },
    {
      _id: '4',
      name: 'Anna Jansen',
      emailAddress: 'a.jansen@outlook.com',
      role: UserRole.Admin,
      gender: UserGender.Female,
      password: 'AdamAnna',
      isActive: false,
      profileImgUrl: "https://picsum.photos/id/40/200/300"
    },
    {
      _id: '5',
      name: 'Peter Bakker',
      emailAddress: 'p.bakker@outlook.com',
      role: UserRole.Unknown,
      gender: UserGender.Male,
      password: 'PeterBakkers',
      isActive: true,
      profileImgUrl: "https://picsum.photos/id/64/200/300"
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
    return of(this.users).pipe(delay(1000));
  }

  getUserById(id: string | null): IUserInfo {
    console.log('getUserById aangeroepen');
    return this.users.filter((user) => user._id === id)[0];
  }

  getuserByIdAsync(id: string | null): Observable<IUserInfo> {
    console.log('getUserByIdAsync aangeroepen');
    return of(this.users.filter((user) => user._id === id)[0]).pipe(delay(1000));
  }
}
