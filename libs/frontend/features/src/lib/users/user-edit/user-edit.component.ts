import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '@avans-nx-workshop/backend/user';
import { Subscription } from 'rxjs';
import { UserGender } from '@avans-nx-workshop/shared/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'avans-nx-workshop-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [],
  providers: [UserService, DatePipe]
})
export class UserEditComponent implements OnInit, OnDestroy {
  userId: string | null = null;
  user: User = {} as User;
  sub: Subscription = new Subscription();
  genders = Object.values(UserGender);
  userForm: FormGroup;
  photoForm: FormGroup;
  formattedBirthDate: string = '';
  isNewUser: boolean = false;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      formattedBirthDate: ['', [Validators.required, this.dateValidator]],
      password: [
        '',
        this.isNewUser 
          ? [Validators.required, Validators.minLength(8)]
          : [],
      ],
    });
  
    this.photoForm = this.fb.group({
      profileImgUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.userId = params.get('id');
      this.isNewUser = !this.userId; 
  
      if (this.isNewUser) {
        // Voeg validatie toe voor nieuwe gebruikers
        this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
        this.userForm.get('password')?.updateValueAndValidity();
      }
  
      if (this.isNewUser) {
        this.isLoading = false;
        this.userForm.markAllAsTouched();
      } else {
        this.sub = this.userService.getUserByIdAsync(this.userId).subscribe({
          next: (user: User) => {
            this.user = user;
            this.isLoading = false;
  
            if (this.user.birthDate) {
              this.formattedBirthDate = this.datePipe.transform(this.user.birthDate, 'dd-MM-yyyy')!;
              this.userForm.patchValue({
                name: this.user.name,
                emailAddress: this.user.emailAddress,
                gender: this.user.gender,
                formattedBirthDate: this.formattedBirthDate,
              });
            }
          },
          error: () => {
            this.isLoading = true; 
          },
        });
      }
    });
  }  

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSave() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); // Markeer alle velden als 'aangeraakt' om fouten weer te geven
      return;
    }

    if (this.userForm.valid) {
      const formValues = this.userForm.value;
  
      // Gebruik een standaardafbeelding als er geen URL is opgegeven
      const profileImgUrl = this.photoForm.get('profileImgUrl')?.value || 
        this.user.profileImgUrl || 
        'https://lpcna.nhs.uk/application/files/1516/0322/1131/person-placeholder.jpg';
  
      if (this.isNewUser) {
        // Nieuwe gebruiker aanmaken
        const newUser: User = {
          ...formValues,
          profileImgUrl,
          birthDate: this.parseDate(formValues.formattedBirthDate),
        };
  
        this.userService.createUser(newUser).subscribe((createdUser: User) => {
          this.router.navigate(['/users', createdUser._id]); // Navigeren naar detailpagina
        });
      } else {
        // Bestaande gebruiker bijwerken
        const [day, month, year] = formValues.formattedBirthDate.split('-');
        this.user.birthDate = new Date(+year, +month - 1, +day);
        this.user.name = formValues.name;
        this.user.emailAddress = formValues.emailAddress;
        this.user.gender = formValues.gender;
  
        this.user.profileImgUrl = profileImgUrl;
  
        this.userService.updateUser(this.userId!, this.user).subscribe(() => {
          this.router.navigate(['/users', this.userId]); // Navigeren naar detailpagina
        });
      }
    }
  }
  
  
  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  dateValidator(control: any): { [key: string]: boolean } | null {
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!control.value.match(datePattern)) {
      return { invalidDate: true };
    }
    const [day, month, year] = control.value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return { invalidDate: true };
    }
    if (date > new Date()) {
      return { futureDate: true };
    }
    return null;
  }

  updatePhoto() {
    if (this.photoForm.valid) {
      const newUrl = this.photoForm.value.profileImgUrl;
      this.user.profileImgUrl = newUrl;      
    }
  }
  
}