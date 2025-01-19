import { Routes } from '@angular/router';
import { HomeComponent } from './game/pages/home/home.component';
import { ByRoundsComponent } from './game/pages/by-rounds/by-rounds.component';
import { ResultsComponent } from './game/pages/results/results.component';
import { ByLossComponent } from './game/pages/by-loss/by-loss.component';
import { ResultsInfiniteComponent } from './game/pages/results-infinite/results-infinite.component';
import { ByTimeComponent } from './game/pages/by-time/by-time.component';
import { ResultsTimeComponent } from './game/pages/results-time/results-time.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'play',
        children: [
            {
                path: 'rounds',
                component: ByRoundsComponent
            },
            {
                path: 'infinite',
                component: ByLossComponent
            },
            {
                path: 'time',
                component: ByTimeComponent
            },
            {
                path: '**',
                redirectTo: '../'
            }
        ],
    },
    {
        path: 'results',
        children: [
            {
                path: 'rounds',
                component: ResultsComponent
            },
            {
                path: 'infinite',
                component: ResultsInfiniteComponent
            },
            {
                path: 'time',
                component: ResultsTimeComponent
            },
            {
                path: '**',
                redirectTo: '../'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }

];
