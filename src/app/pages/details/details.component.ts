import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public urlPokemon = "http://pokeapi.co/api/v2/pokemon";
  public urlName = "http://pokeapi.co/api/v2/pokemon-species";

  public pokemon: any;

  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private pokeService: PokeApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon() {
    const id = this.route.snapshot.params['id'];
    const pokemon = this.pokeService.apiGetPokemon(`${this.urlPokemon}/${id}`);
    const name = this.pokeService.apiGetPokemon(`${this.urlName}/${id}`);

    //faz o join das duas requisições
    return forkJoin([pokemon, name]).subscribe(res => {
      this.pokemon = res;
      this.isLoading = true;
    }, error => {
      this.apiError = true;
    });
  }

}
