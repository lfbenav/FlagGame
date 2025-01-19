import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Country, SearchResponse } from '../interfaces/countries.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries( ): Observable<Country[]> {
    const url = `${environment.apiUrl}/all?fields=name,flags`;
    return this.http.get<SearchResponse[]>(url).pipe(
      map( (response) =>
        response.map( (country) => ({
          flag: country.flags.svg,
          name: country.name.common
        }))),
      catchError(() => of([]))
    )
  }

}
