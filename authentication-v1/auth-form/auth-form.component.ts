import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
}
  from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder
}
  from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ]
})
export class AuthFormComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  readonly url: string = this.router.url.split('/').pop() || 'default';

  @Input() actionButtonText = 'Iniciar sesión';
  @Input() isPasswordResetPage = false;
  @Output() formSubmitted = new EventEmitter<any>();

  ngOnChanges() {
    this.getPasswordValidators();
  }

  public authForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.minLength(6)])],
  });

  private getPasswordValidators() {
    console.log(this.isPasswordResetPage)

    if (!this.isPasswordResetPage) {
      this.authForm.get('password')?.setValidators(Validators.required);
    }

  }

  submitCredentials(authForm: FormGroup): void {
    if (!authForm.valid) {
      console.log('Form is not valid yet, current value:', authForm.value);
    } else {
      const credentials = {
        email: authForm.value.email,
        password: authForm.value.password,
      };
      console.log(credentials)
      this.formSubmitted.emit(credentials);
    }
  }
}