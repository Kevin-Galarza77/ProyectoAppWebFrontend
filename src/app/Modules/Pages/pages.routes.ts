import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from 'src/app/Services/guards/auth.guard';
import { CategoriasComponent } from './Categorias/categorias.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { GestionUsuariosComponent } from './Gestion-usuarios/gestion-usuarios.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { PedidosComponent } from './Pedidos/pedidos.component';
import { PerfilUSerComponent } from './perfil-user/perfil-user.component';
import { ProductosComponent } from './productos/productos.component';
import { SubCategoriasComponent } from './SubCategorias/sub-categorias.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
 

const PAGES_ROUTES: Routes = [
    {
        path: '', component: HomeComponent, canActivate:[AuthGuard],children: [
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
            {
                path: 'Categorias', component: CategoriasComponent,
               //  canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
                loadChildren: () => import('./Categorias/categoria.module').then(m => m.CategoriaModule)
            },
            {
                path: 'SubCategorias', component: SubCategoriasComponent,
               //  canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
                loadChildren: () => import('./SubCategorias/subcategoria.module').then(m => m.SubcategoriaModule)
            },
            {
                path: 'Productos', component: GestionProductosComponent,
               //  canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
                loadChildren: () => import('./gestion-productos/gestion-productos.module').then(m => m.GestionProductosModule)
            },
            {
                path: 'Pedidos', component: PedidosComponent,
               //  canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
                loadChildren: () => import('./Pedidos/pedidos.module').then(m => m.PedidosModule)
            },
            {
                path: 'Usuarios', component: GestionUsuariosComponent,
               //  canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
                loadChildren: () => import('./Gestion-usuarios/gestion-usuarios.module').then(m => m.GestionUsuariosModule)
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
