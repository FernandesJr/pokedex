import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private uri: string = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";

  constructor(private http : HttpClient) {}

  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(this.uri).pipe(
      tap(res => res),
      tap(res => {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemon(resPokemons.url).subscribe(
            res => resPokemons.status = res//adcionando um atributo a primeira res
          )
        })
      })
    );
  }

  public apiGetPokemon( url: string ):Observable<any>{
    return this.http.get<any>( url );
  }
}
