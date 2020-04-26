import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'results', loadChildren: './tab2/results/results.module#ResultsPageModule' },
  { path: 'fixtures/:id', loadChildren: './pages/fixtures/fixtures.module#FixturesPageModule' },
  { path: 'team/:league', loadChildren: './pages/team/team.module#TeamPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'team-detail/:team', loadChildren: './pages/team-detail/team-detail.module#TeamDetailPageModule' },
  { path: 'players-detail/:player', loadChildren: './pages/team-detail/players-detail/players-detail.module#PlayersDetailPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
