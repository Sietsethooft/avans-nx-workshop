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
  ];

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
  
  getUserByIdAsync(id: string | null): Observable<IUserInfo> {
    console.log('getUserByIdAsync aangeroepen');
    return this.http
    .get<ApiResponse<any>>(environment.dataApiUrl + '/user/' + id)
    .pipe(
      tap(console.log),
      map(response => response.results));
  }
}
