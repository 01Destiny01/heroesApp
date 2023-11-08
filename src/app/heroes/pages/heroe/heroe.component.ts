import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators'
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles:[
    `img{width:100%;
  border-radius:5px}`]
})
export class HeroeComponent implements OnInit {
heroe!:Heroe
  constructor(private route: ActivatedRoute, private heroesServices:HeroesService,
    private ruoter:Router) { }

  ngOnInit(): void {
    //decomposicion del string para solo mostrar el id y no el string
    //[anteriormente] => subscribe(console.log) return =>
    this.route.params
    .pipe(
      switchMap(({id}) => this.heroesServices.getHeroePorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);
      
  
  }
regresar(){
  this.ruoter.navigate(['/heroes/listado']);
}
}
