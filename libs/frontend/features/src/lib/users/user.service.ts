import { Injectable } from '@angular/core';
import { delay, map, Observable, of, tap } from 'rxjs';
import { ApiResponse, IUserInfo, UserGender, UserRole } from "@avans-nx-workshop/shared/api";
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly users: IUserInfo[] = [
    // {
    //     _id: '1',
    //   name: 'Sietse Hooft',
    //   emailAddress: 's.Hooft@outlook.com',
    //   role: UserRole.Unknown,
    //   gender: UserGender.Unknown,
    //   password: 'SietsHooft',
    //   isActive: true,
    //   profileImgUrl: "https://picsum.photos/id/1/200/300"
    // },
    // {
    //   _id: '2',
    //   name: 'Merel van Dijk',
    //   emailAddress: 'm.Dijk2@outlook.com',
    //   role: UserRole.Guest,
    //   gender: UserGender.Unknown,
    //   password: 'MerelDijk',
    //   isActive: true,
    //   profileImgUrl: "https://picsum.photos/id/22/200/300"
    // },
    // {
    //   _id: '3',
    //   name: 'Jan de Vries',
    //   emailAddress: 'j.devries@outlook.com',
    //   role: UserRole.Admin,
    //   gender: UserGender.Male,
    //   password: 'JanVriesland',
    //   isActive: true,
    //   profileImgUrl: "https://picsum.photos/id/27/200/300"
    // },
    // {
    //   _id: '4',
    //   name: 'Anna Jansen',
    //   emailAddress: 'a.jansen@outlook.com',
    //   role: UserRole.Admin,
    //   gender: UserGender.Female,
    //   password: 'AdamAnna',
    //   isActive: false,
    //   profileImgUrl: "https://picsum.photos/id/40/200/300"
    // },
    // {
    //   _id: '5',
    //   name: 'Peter Bakker',
    //   emailAddress: 'p.bakker@outlook.com',
    //   role: UserRole.Unknown,
    //   gender: UserGender.Male,
    //   password: 'PeterBakkers',
    //   isActive: true,
    //   profileImgUrl: "https://picsum.photos/id/64/200/300"
    // }
  ];

  // readonly users? IUserInfo[];

  constructor(private http: HttpClient) {
    console.log('Service constructor aangeroepen');
  }

  getUsersAsync(): Observable<IUserInfo[]> {
    console.log('getUsersAsObservableAsync aangeroepen');
    
    return this.http
    .get<ApiResponse<any>>(environment.dataApiUrl + '/user')
    .pipe(
      tap(console.log),
      map(response => response.results));
  }
  
  getUserById(id: string | null): IUserInfo {
    console.log('getUserById aangeroepen');
    return this.users!.filter((user) => user._id === id)[0];
  }

  getUserByIdAsync(id: string | null): Observable<IUserInfo> {
    console.log('getUserByIdAsync aangeroepen');
    return this.http
    .get<ApiResponse<any>>(environment.dataApiUrl + '/user/' + id)
    .pipe(
      tap(console.log),
      map(response => response.results));
  }
}
