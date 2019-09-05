import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'games', loadChildren: './games/games.module#GamesPageModule' },
  { path: 'product/:id', loadChildren: './product/product.module#ProductPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'playcards', loadChildren: './playcards/playcards.module#PlaycardsPageModule' },
  { path: 'game-description/:id', loadChildren: './game-description/game-description.module#GameDescriptionPageModule' },  { path: 'stripe', loadChildren: './stripe/stripe.module#StripePageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
