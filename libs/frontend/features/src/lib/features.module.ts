import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { BandDetailsComponent } from './bands/band-details/band-details.component';
import { BandEditComponent } from './bands/band-edit/band-edit.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [UserDetailsComponent, UserListComponent, UserEditComponent, BandDetailsComponent, BandEditComponent],
  providers: [provideHttpClient()],
})
export class FeaturesModule {}