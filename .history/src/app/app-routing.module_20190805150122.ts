import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
/* {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
*/
  { path: 'results', loadChildren: './pages/results/results.module#ResultsPageModule' },
  { path: 'fixtures', loadChildren: './pages/fixtures/fixtures.module#FixturesPageModule' },
  { path: 'teams', loadChildren: './pages/teams/teams.module#TeamsPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'team-detail', loadChildren: './pages/team-detail/team-detail.module#TeamDetailPageModule' },
  { path: 'players-detail', loadChildren: './pages/players-detail/players-detail.module#PlayersDetailPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
