import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectLanguage } from '../../Store/language/language.selector';

@Component({
  selector: 'app-slider',
  imports: [CommonModule, CarouselModule, TranslatePipe],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements OnInit, OnDestroy {
  // Toggled false -> true around a language switch so Angular fully
  // destroys and recreates <owl-carousel-o>, forcing Owl to recalculate
  // slide widths/positions in the new text direction instead of keeping
  // stale measurements from before the switch.
  showCarousel = true;

  private _langSubscription!: Subscription;

  constructor(private _store: Store) {}

  categories = [
    {
      nameKey: 'SLIDER.MACBOOK_PCS',
      items: '3+ items',
      image: 'images/imgi_18_cat01.png',
    },
    {
      nameKey: 'SLIDER.CASUAL_SHIRTS',
      items: '10+ items',
      image: 'images/imgi_19_cat02.png',
    },
    {
      nameKey: 'SLIDER.LAPTOP',
      items: '10+ items',
      image: 'images/imgi_20_cat03.png',
    },
    {
      nameKey: 'SLIDER.FLORAL_DRESSES',
      items: '10+ items',
      image: 'images/imgi_21_cat04.png',
    },
    {
      nameKey: 'SLIDER.WOMENS_SHIRTS',
      items: '5+ items',
      image: 'images/imgi_22_cat05.png',
    },
    {
      nameKey: 'SLIDER.TV_LCD',
      items: '10+ items',
      image: 'images/imgi_23_cat06.png',
    },
    {
      nameKey: 'SLIDER.WOMENS_DRESSES',
      items: '10+ items',
      image: 'images/imgi_24_cat07.png',
    },
    {
      nameKey: 'SLIDER.MENS_APPAREL',
      items: '10+ items',
      image: 'images/imgi_25_cat08.png',
    },
    {
      nameKey: 'SLIDER.HANDSFREE',
      items: '10+ items',
      image: 'images/imgi_26_cat09.png',
    },
    {
      nameKey: 'SLIDER.JOYSTICKS',
      items: '10+ items',
      image: 'images/imgi_27_cat10.png',
    },
    {
      nameKey: 'SLIDER.EARBUDS',
      items: '10+ items',
      image: 'images/imgi_28_cat11.png',
    },
    {
      nameKey: 'SLIDER.CASUAL_SHOES',
      items: '10+ items',
      image: 'images/imgi_29_cat12.png',
    },
    {
      nameKey: 'SLIDER.COTTON_SOCKS',
      items: '6+ items',
      image: 'images/imgi_30_cat13.png',
    },
  ];

  customOptions: OwlOptions = this.buildOptions(false);

  ngOnInit(): void {
    this._langSubscription = this._store.select(selectLanguage).subscribe({
      next: (lang) => {
        const isRtl = lang === 'ar';

        // New object reference so [options] actually triggers ngOnChanges
        // on <owl-carousel-o> (mutating the existing object wouldn't).
        this.customOptions = this.buildOptions(isRtl);

        // Briefly remove the carousel from the DOM, then re-add it on the
        // next macrotask. This guarantees Owl's previous instance is fully
        // destroyed (no leftover transform/width state) before it
        // reinitializes against the new dir="rtl"/"ltr" layout.
        this.showCarousel = false;
        setTimeout(() => {
          this.showCarousel = true;
        });
      },
    });
  }

  ngOnDestroy(): void {
    this._langSubscription?.unsubscribe();
  }

  private buildOptions(rtl: boolean): OwlOptions {
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      margin: 10,
      rtl,
      navText: [
        '<i class="fa-solid fa-angle-left"></i>',
        '<i class="fa-solid fa-angle-right"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 3,
        },
        940: {
          items: 6,
        },
      },
      nav: true,
    };
  }
}
