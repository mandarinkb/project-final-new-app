import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // กรณี path: '' ไปที่ home
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule)
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'search-filter', loadChildren: './pages/modal/search-filter/search-filter.module#SearchFilterPageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
