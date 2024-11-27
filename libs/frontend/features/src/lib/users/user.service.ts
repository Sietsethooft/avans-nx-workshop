import { Injectable } from '@angular/core';
import { IUser,IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';
import { delay, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { ApiResponse } from '@avans-nx-workshop/shared/api';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    readonly users?: IUserInfo[]

    constructor(private http: HttpClient) {
        console.log('Service constructor aanroepen');
    }

    getUsersAsync(): Observable<IUserInfo[]> {
        console.log('getUsersAsync() aanroepen');
        return this.http
            .get<ApiResponse<any>>(environment.dataApiUrl + '/user')
            .pipe(map((response) => response.results));
    }

    getUserByIdAsync(id: string | null, async: boolean = false): Observable<IUser> {
        console.log('getUserById aanroepen');
        return this.http
            .get<ApiResponse<any>>(environment.dataApiUrl + `/user/${id}`)
            .pipe(map((response) => response.results));
    }

    updateUser(id: string | null, user: IUser): Observable<IUser> {
        console.log('updateUser aanroepen');
        return this.http
            .put<ApiResponse<any>>(environment.dataApiUrl + `/user/${id}`, user)
            .pipe(map((response) => response.results));
    }
}