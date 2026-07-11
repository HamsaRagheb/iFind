import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-welcome-popup',
  imports: [CommonModule],
  templateUrl: './welcome-popup.component.html',
  styleUrl: './welcome-popup.component.css',
})
export class WelcomePopupComponent {
  isVisable = false;

  constructor(private _router: Router) {}

  ngOnInit() {
    this._router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const hidden = sessionStorage.getItem('hideWelcome');
        const showWelcome = sessionStorage.getItem('showWelcome');

        if (!hidden && showWelcome === 'true') {
          sessionStorage.removeItem('showWelcome');
          setTimeout(() => {
            this.isVisable = true;
            document.body.style.overflowY = 'hidden';
          }, 1000);
        }
      });
  }

  close() {
    sessionStorage.setItem('hideWelcome', 'true');
    this.isVisable = false;
    document.body.style.overflow = '';
  }

  closeOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay'))
      this.close();
  }
}
