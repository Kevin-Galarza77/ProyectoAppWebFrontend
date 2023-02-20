// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from "@angular/router";
// import { AuthGuard } from '../services/guards/auth.guard';
// import { RolControlGuard } from '../services/guards/Roles/rol-control.guard';
// import { AdministracionComponent } from "./administracion/administracion.component";
// import { FacturacionComponent } from "./facturacion/facturacion.component";
// import { GestionClientesComponent } from "./gestion-clientes/gestion-clientes.component";
// import { GuiasComponent } from "./guias/guias.component";
// import { HomeComponent } from './home/home.component';
// import { ReportesComponent } from "./reportes/reportes.component";
// import { UsuariosComponent } from "./usuarios-compania/usuarios.component";

// const PAGES_ROUTES: Routes = [
//     {
//         path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
//             {
//                 path: 'guia', component: GuiasComponent,
//                 canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
//                 loadChildren: () => import('./guias/guias.module').then(m => m.GuiasModule)
//             },
//             {
//                 path: 'usuarios', component: UsuariosComponent,
//                 canLoad: [RolControlGuard], data: { roles: [1, 2, 3, 4, 5, 6, 7, 8] },
//                 loadChildren: () => import('./usuarios-compania/usuarios.module').then(m => m.UsuariosModule)
//             },
//             {
//                 path: 'reporte-sistema', component: ReportesComponent,
//                 // canLoad: [RolControlGuard], data: { roles: [] },
//                 loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)
//             },
//             {
//                 path: 'clientes', component: GestionClientesComponent,
//                 // canLoad: [RolControlGuard], data: { roles: [1, 2] },
//                 loadChildren: () => import('./gestion-clientes/gestion-clientes.module').then(m => m.GestionClientesModule)
//             },
//             {
//                 path: 'facturacion', component: FacturacionComponent,
//                 // canLoad: [RolControlGuard], data: { roles: [1, 2] },
//                 loadChildren: () => import('./facturacion/facturacion.module').then(m => m.FacturacionModule)
//             },
//             {
//                 path: 'administracion', component: AdministracionComponent, canLoad: [RolControlGuard],
//                 data: { roles: [1, 2, 3, 5, 7] },
//                 loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule)
//             },

//             { path: '**', pathMatch: 'full', redirectTo: '' }
//         ]
//     }
// ]

// @NgModule({
//     imports: [RouterModule.forChild(PAGES_ROUTES)],
//     exports: [RouterModule],
//     providers: [RolControlGuard]
// })

// export class PagesRoutingModule { }
