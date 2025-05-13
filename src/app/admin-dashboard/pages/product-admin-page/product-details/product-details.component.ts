import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameCarouselComponent } from '@games/components/game-carousel/game-carousel.component';
import { Game } from '@games/interfaces/game.interface';
import { GameImagePipe } from '@games/pipes/game-image.pipe';
import { GamesService } from '@games/services/games.service';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { FormUtils } from '@utils/form-utils';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'product-details',
  imports: [GameCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {

  game = input.required<Game>()
  gamesService = inject(GamesService)
  router = inject(Router)
  wasSaved = signal(false)

  /* No me la creo como signal ya que no pretendo que cambie */
  imageFileList: FileList | undefined = undefined
  tempImages = signal<string[]>([])

  imagesToCarousel = computed(() => {
    const currentGameImage = [...this.game().image, ...this.tempImages()]
    return currentGameImage

  })

  fb = inject(FormBuilder)

  productForm = this.fb.group({
    title: ['', Validators.required],
    uuid: ['', Validators.required],
    /* Validators.pattern(FormUtils.slugPattern)
       Validators.pattern('^[a-z0-9_]+(?:-[a-z0-9_]+)*$')*/
    description: ['', Validators.required],
    genre: ['action', Validators.required],
    release_year: ['', Validators.min(1900)],
    platforms: [[''],Validators.required],
    developer: ['',Validators.required],
    publisher: ['',Validators.required],
    image: [[""]],
    favorite: [false],
    rating: [0],
    isVisible: [true],
  })

  ngOnInit() {
    this.productForm.reset(this.game() as any)
  }

  async onSubmit() {

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

  if (this.game()._id === 'new') {
    /* el firstValueFrom hace el suscribe internamente */
    const game = await firstValueFrom(
      this.gamesService.createGame(productLike, this.imageFileList)
    )
    console.log("Juego creado!!", this.game())
    this.router.navigate(['/admin/products', game.uuid])

    /* this.gamesService.createGame(productLike).subscribe(
      game => { console.log("Juego creado!!", this.game())
        this.router.navigate(['/admin/products', game.uuid])
      }) */

  } else {
   await firstValueFrom(
      this.gamesService.updateGameByUuid(this.game().uuid, productLike, this.imageFileList)
    )

    console.log("Juego actualizado!!", this.game())

   /*  this.gamesService.updateGameByUuid(this.game().uuid, productLike).subscribe(
      game => {
        console.log("Juego actualizado!!", this.game())
      }
    ) */

  }

  this.wasSaved.set(true)
  setTimeout(() => {
    this.wasSaved.set(false)
  }, 3000)

  /* console.log(this.productForm.value)
  console.log('productLike', productLike) */
 }

 onFilesChanged( event: Event){
  const fileList = (event.target as HTMLInputElement).files
  this.imageFileList = fileList ?? undefined

  const imageUrls = Array.from(fileList ?? []).map((file) =>
     URL.createObjectURL(file)

  )
  this.tempImages.set(imageUrls)

 }
}
