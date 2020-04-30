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
  /*{ path: 'home', loadChildren: './pages/home/home.module#HomePageModule' }
  { path: 'results', loadChildren: './pages/results/results.module#ResultsPageModule' },
  { path: 'fixtures/:id', loadChildren: './pages/fixtures/fixtures.module#FixturesPageModule' },
  { path: 'team/:league', loadChildren: './pages/teams/teams.module#TeamsPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'team-detail/:team', loadChildren: './pages/team-detail/team-detail.module#TeamDetailPageModule' },
  { path: 'players-detail/:player', loadChildren: './pages/players-detail/players-detail.module#PlayersDetailPageModule' },
*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
