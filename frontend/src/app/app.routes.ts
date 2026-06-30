import { Routes } from '@angular/router';
import { NotFound } from './shared/not-found/not-found';
import { Layout } from './layout/layout';
import { Home as homeLayout } from './layout/home/home';
import { About as aboutLayout } from './layout/about/about';
import { Projects as projectLayout } from './layout/projects/projects';
import { Services as servicesLayout } from './layout/services/services';
import { Skills as skillsLayout } from './layout/skills/skills';
import { Contact as contactLayout } from './layout/contact/contact';
import { Dashboard } from './dashboard/dashboard';
import { Home } from './dashboard/home/home';
import { About } from './dashboard/about/about';
import { Projects } from './dashboard/projects/projects';
import { Services } from './dashboard/services/services';
import { Skills } from './dashboard/skills/skills';
import { Contact } from './dashboard/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: homeLayout },
      { path: 'about', component: aboutLayout },
      { path: 'project', component: projectLayout },
      {
        path: 'service',
        component: servicesLayout,
      },
      { path: 'skill', component: skillsLayout },
      { path: 'contact', component: contactLayout },
    ],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: Home },
      { path: 'profile', component: About },
      { path: 'project', component: Projects },
      { path: 'service', component: Services },
      { path: 'skill', component: Skills },
      { path: 'contact', component: Contact },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
