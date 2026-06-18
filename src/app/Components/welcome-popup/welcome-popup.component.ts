import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome-popup',
  imports: [CommonModule],
  templateUrl: './welcome-popup.component.html',
  styleUrl: './welcome-popup.component.css',
})
export class WelcomePopupComponent {
  isVisable = false;

  constructor(private _activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    const hidden = sessionStorage.getItem('hideWelcome');
    const showWelcome =
      this._activatedRoute.snapshot.queryParamMap.get('welcome');

    if (!hidden && showWelcome === 'true') {
      setTimeout(() => (this.isVisable = true), 1000);
    }
  }

  close() {
    sessionStorage.setItem('hideWelcome', 'true');
    this.isVisable = false;
  }

  closeOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay'))
      this.close();
  }
}
