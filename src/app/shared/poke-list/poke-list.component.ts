import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public pokemons: any;
  private pokemonsFixe: any;

  public apiError: boolean = false;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(res => {
      this.pokemonsFixe = res.results;
      this.pokemons = this.pokemonsFixe;
    }, error => {
      this.apiError = true;
    });
  }

  public getSearch(value: string) {
    const filter = this.pokemonsFixe.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase()); // Retornando somente o que é parecido
    });
    this.pokemons = filter;
  }

}
