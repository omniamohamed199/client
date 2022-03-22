import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './core/guards/authguard.guard';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'Shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule) },
  { path: 'Basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule) },
  { path: 'Checkout', loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule) ,canActivate:[AuthguardGuard]},
  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: { breadcrumb: { skip: "true" } } },
  { path: 'Notfound', component: NotfoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
