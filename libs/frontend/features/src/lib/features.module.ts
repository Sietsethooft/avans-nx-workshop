import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [UserDetailsComponent, UserListComponent, UserEditComponent],
    // exports: [ (Dit mag weg, aangezien hij nu al exports doet in de index.ts)
    //     // UserDetailsComponent,
    //     // UserListComponent,
    //     // UserEditComponent
    // ]
})
export class FeaturesModule {}
