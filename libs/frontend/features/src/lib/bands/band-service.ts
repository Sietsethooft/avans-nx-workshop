import { Injectable } from '@angular/core';
import { delay, map, Observable, of, tap } from 'rxjs';
import { ApiResponse, IBand } from "@avans-nx-workshop/shared/api";
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class BandService {
  readonly bands: IBand[] = [];

  constructor(private http: HttpClient) {
    console.log('BandService constructor aangeroepen');
  }

  getBandsAsync(): Observable<IBand[]> {
    console.log('getBandsAsync aangeroepen');
    
    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/band')
      .pipe(
        tap(console.log),
        map(response => response.results)
      );
  }

  getBandByIdAsync(id: string | null): Observable<IBand> {
    console.log('getBandByIdAsync aangeroepen');
    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/band/' + id)
      .pipe(
        tap(console.log),
        map(response => response.results)
      );
  }
}