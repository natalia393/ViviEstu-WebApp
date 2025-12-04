import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Autenticador } from './components/autenticador/autenticador';
import { Usuarioinsertar } from './components/usuario/usuarioinsertar/usuarioinsertar';
import { Home } from './components/home/home';
import { seguridadGuard } from './guard/seguridad-guard';
import { Zona } from './components/zona/zona';
import { Zonalistar } from './components/zona/zonalistar/zonalistar';
import { Zonainsertar } from './components/zona/zonainsertar/zonainsertar';
import { Valoracion } from './components/valoracion/valoracion';
import { Valoracionlistar } from './components/valoracion/valoracionlistar/valoracionlistar';
import { Valoracioninsertar } from './components/valoracion/valoracioninsertar/valoracioninsertar';
import { Favorito } from './components/favorito/favorito';
import { Favoritolistar } from './components/favorito/favoritolistar/favoritolistar';
import { Simuladorgasto } from './components/simuladorgasto/simuladorgasto';
import { Simuladorgastolistar } from './components/simuladorgasto/simuladorgastolistar/simuladorgastolistar';
import { Simuladorgastoinsertar } from './components/simuladorgasto/simuladorgastoinsertar/simuladorgastoinsertar';
import { Reporte } from './components/reporte/reporte';
import { Reportelistar } from './components/reporte/reportelistar/reportelistar';
import { Comparacion } from './components/comparacion/comparacion';
import { Comparacionlistar } from './components/comparacion/comparacionlistar/comparacionlistar';
import { Comparacioninsertar } from './components/comparacion/comparacioninsertar/comparacioninsertar';
import { Comparaciondetallelistar } from './components/comparaciondetalle/comparaciondetallelistar/comparaciondetallelistar';
import { Usuario } from './components/usuario/usuario';
import { Usuariolistar } from './components/usuario/usuariolistar/usuariolistar';
import { Role } from './components/role/role';
import { Rolelistar } from './components/role/rolelistar/rolelistar';
import { Roleinsertar } from './components/role/roleinsertar/roleinsertar';
import { Zonauniversidad } from './components/zonauniversidad/zonauniversidad';
import { Zonauniversidadlistar } from './components/zonauniversidad/zonauniversidadlistar/zonauniversidadlistar';
import { Zonauniversidadinsertar } from './components/zonauniversidad/zonauniversidadinsertar/zonauniversidadinsertar';
import { Reporteinsertar } from './components/reporte/reporteinsertar/reporteinsertar';
import { Reportedetalles } from './components/reporte/reportedetalles/reportedetalles';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Autenticador },
  { path: 'registro', component: Usuarioinsertar },

  // Dashboard
  { path: 'homes', component: Home, canActivate: [seguridadGuard] },

  // ------------------------------
  // ZONAS
  // ------------------------------
  {
    path: 'zona',
    component: Zona,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Zonalistar },
      { path: 'nuevos', component: Zonainsertar },
      { path: 'edits/:id', component: Zonainsertar },
    ],
  },

  {
    path: 'zona-universidad',
    component: Zonauniversidad,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Zonauniversidadlistar },
      { path: 'nuevos', component: Zonauniversidadinsertar },
      { path: 'edits/:id', component: Zonauniversidadinsertar },
    ],
  },

  // ------------------------------
  // VALORACIONES
  // ------------------------------
  {
    path: 'valoracion',
    component: Valoracion,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Valoracionlistar },
      { path: 'nuevos', component: Valoracioninsertar },
      { path: 'edits/:id', component: Valoracioninsertar },
    ],
  },

  // ------------------------------
  // FAVORITOS
  // ------------------------------
  {
    path: 'favoritos',
    component: Favorito,
    canActivate: [seguridadGuard],
    children: [{ path: 'listas', component: Favoritolistar }],
  },

  // ------------------------------
  // SIMULADOR DE GASTOS
  // ------------------------------
  {
    path: 'simulador',
    component: Simuladorgasto,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Simuladorgastolistar },
      { path: 'nuevos', component: Simuladorgastoinsertar },
    ],
  },

  // ------------------------------
  // REPORTES (JSON generados)
  // ------------------------------
  {
    path: 'reporte',
    component: Reporte,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Reportelistar },
      { path: 'nuevos', component: Reporteinsertar }, // crear reporte
      { path: 'edits/:id', component: Reporteinsertar },
      { path: 'detalle', component: Reportedetalles },
    ],
  },

  // ------------------------------
  // COMPARACIÓN (PADRE)
  // ------------------------------
  {
    path: 'comparacion',
    component: Comparacion,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Comparacionlistar }, // mis comparaciones guardadas
      { path: 'nuevos', component: Comparacioninsertar }, // crear comparacion
      { path: 'edits/:id', component: Comparacioninsertar },

      // TABLA DE DETALLE
      { path: 'detalle/:id', component: Comparaciondetallelistar },
    ],
  },

  // ------------------------------
  // USUARIOS (ADMIN)
  // ------------------------------
  {
    path: 'usuario',
    component: Usuario,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Usuariolistar },
      { path: 'edits/:id', component: Usuarioinsertar },
    ],
  },

  // ------------------------------
  // ROLES
  // ------------------------------
  {
    path: 'rol',
    component: Role,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Rolelistar },
      { path: 'nuevos', component: Roleinsertar },
      { path: 'edits/:id', component: Roleinsertar },
    ],
  },
];
