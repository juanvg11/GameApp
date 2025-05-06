import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameCarouselComponent } from '@games/components/game-carousel/game-carousel.component';
import { Game } from '@games/interfaces/game.interface';
import { GamesService } from '@games/services/games.service';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { FormUtils } from '@utils/form-utils';


@Component({
  selector: 'product-details',
  imports: [GameCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {

  game = input.required<Game>()
  gamesService = inject(GamesService)
  router = inject(Router)

  fb = inject(FormBuilder)

  productForm = this.fb.group({
    title: ['', Validators.required],
    uuid: ['', Validators.required],
    /* Validators.pattern(FormUtils.slugPattern)
       Validators.pattern('^[a-z0-9_]+(?:-[a-z0-9_]+)*$')*/
    description: ['', Validators.required],
    genre: ['action', Validators.required],
    release_year: ['', Validators.min(1900)],
    platforms: [['']],
    developer: [''],
    publisher: [''],
    image: [[""]],
    favorite: [false],
    rating: [0],
    isVisible: [true],
  })

  ngOnInit() {
    this.productForm.reset(this.game() as any)
  }

  onSubmit() {

    const isValid = this.productForm.valid

    this.productForm.markAllAsTouched()

    if (!isValid){
      console.log('Formulario invalido', this.productForm.errors)
      return
    }


    const formValue = this.productForm.value


  /* Transformamos la data a un objeto de tipo Partial<Game> para que sea del mismo tipo que tiene que recibir el backend */
  const productLike: Partial<Game> = {
      ...(formValue as any),
  }

  console.log('productLike', productLike)

  if (this.game().id === 'new') {
    console.log('Creando juego en el ts', this.game())
    this.gamesService.createGame(productLike).subscribe(
      game => { console.log("Juego creado!!", this.game())
        this.router.navigate(['/admin/products', game.uuid])
      })

  } else {
    console.log('Actualizando juego en el ts', this.game())
    this.gamesService.updateGameByUuid(this.game().uuid, productLike).subscribe(
      game => {
        console.log("Juego actualizado!!", this.game())
      }
    )

  }


  /* console.log(this.productForm.value)
  console.log('productLike', productLike) */


 }
}
