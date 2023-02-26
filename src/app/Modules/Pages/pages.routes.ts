import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilUSerComponent } from './perfil-user/perfil-user.component';
import { ProductosComponent } from './productos/productos.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
 

const PAGES_ROUTES: Routes = [
    {
        path: '', component: HomeComponent, children: [
             {
                 path: 'Perfil', component: PerfilUSerComponent,
                //  canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
                 loadChildren: () => import('./perfil-user/perfil-user.module').then(m => m.PerfilUSerModule)
             },
             {
                path: 'Inicio', component: InicioComponent,
               //  canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
                loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
            },
            {
                path: 'Inicio/:id', component: SubcategoriesComponent,
               //  canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
                loadChildren: () => import('./subcategories/subcategories.module').then(m => m.SubcategoriesModule)
            },
            {
                path: 'Inicio/:id/:sub', component: ProductosComponent,
               //  canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
                loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
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
