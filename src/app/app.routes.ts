import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';
import { userGuard } from './Guards/user.guard';
import { WishlistComponent } from './Components/wishlist/wishlist.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
  {
    path: 'signUp',
    loadComponent: () =>
      import('./Components/Auth/Components/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent,
      ),
    canActivate: [userGuard],
  },
  {
    path: 'signIn',
    loadComponent: () =>
      import('./Components/Auth/Components/sign-in/sign-in.component').then(
        (m) => m.SignInComponent,
      ),
    canActivate: [userGuard],
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./Components/Auth/Components/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent,
      ),
    canActivate: [userGuard],
  },
  {
    path: 'verify-reset-code',
    loadComponent: () =>
      import('./Components/Auth/Components/verify-reset-code/verify-reset-code.component').then(
        (m) => m.VerifyResetCodeComponent,
      ),
    canActivate: [userGuard],
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./Components/Auth/Components/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent,
      ),
    canActivate: [userGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./Components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./Components/search/search.component').then(
        (m) => m.SearchComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'productDetails/:id',
    loadComponent: () =>
      import('./Components/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'changePassword',
    loadComponent: () =>
      import('./Components/Auth/Components/update-password/update-password.component').then(
        (m) => m.UpdatePasswordComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./Components/checkout/checkout.component').then(
        (m) => m.CheckoutComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./Components/wishlist/wishlist.component').then(
        (m) => m.WishlistComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./Components/cart/cart.component').then((m) => m.CartComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./Components/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },
];
