import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { PerfilUSerComponent } from './perfil-user/perfil-user.component';
 

const PAGES_ROUTES: Routes = [
    {
        path: '', component: HomeComponent, children: [
             {
                 path: 'Perfil', component: PerfilUSerComponent,
                //  canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
                 loadChildren: () => import('./perfil-user/perfil-user.module').then(m => m.PerfilUSerModule)
             },

            { path: '**', pathMatch: 'full', redirectTo: '' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(PAGES_ROUTES)],
    exports: [RouterModule],
    // providers: [RolControlGuard]
})

export class PagesRoutingModule { }
