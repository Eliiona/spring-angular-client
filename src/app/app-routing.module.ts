import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { RefreshComponent } from './refresh/refresh.component';


const routes: Routes = [
    {path: 'items', component: ItemListComponent},
    {path: 'additem', component: ItemFormComponent},
    {path: 'refresh', component: RefreshComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
