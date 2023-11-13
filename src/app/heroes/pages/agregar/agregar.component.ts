import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',


})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Conmics',
      des: 'DC - Comics'

    },
    {
      id: 'Marvel Conmics',
      des: 'Marvel - Comics'

    }
  ]
  constructor(private services: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog) {

  }
  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activatedRoute.params
      /**recupera el id de la ruta y con el pipe obtiene el héroe
       *y con el subscribe actualiza la inf de la pantalla*/
      .pipe(
        switchMap(({ id }) => this.services.getHeroePorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''


  }
  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      //actualizar héroe
      this.services.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnakbar('Registro actualizado'));
    } else {
      //crear
      this.services.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnakbar('Regristro creado');
        })
    }
  }
  borrarHeroe() {
    const dialog = this._dialog.open(ConfirmarComponent, {
       width: '250px',
      data:this.heroe
      });
      dialog.afterClosed().subscribe((result =>{
        if(result){
          this.services.borrarHeroe(this.heroe.id!)
          .subscribe(resp => {
            this.router.navigate(['/heroes']);
          });
      }}))


  }
  mostrarSnakbar(mensaje: string) {
    this._snackbar.open(mensaje, 'OK', { duration: 2500 })
  }
}
