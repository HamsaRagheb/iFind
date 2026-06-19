import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { filter, take } from 'rxjs';

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
          setTimeout(() => (this.isVisable = true), 1000);
        }
      });
  }

  close() {
    sessionStorage.setItem('hideWelcome', 'true');
    this.isVisable = false;
    document.body.style.overflow = '';
    this._router.navigate(['/home']);
  }

  closeOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay'))
      this.close();
  }
}
