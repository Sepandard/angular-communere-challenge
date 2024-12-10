import { Component, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  Validator,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,FormsModule],
  template: `
  <mat-form-field appearance="outline" class="search-bar">
  <mat-label>{{ placeholder }}</mat-label>
  <input
    matInput
    [(ngModel)]="value"
    (input)="onInputChange($event)"
    (blur)="onBlur()"
    [placeholder]="placeholder"
  />
</mat-form-field>

  
  `,
  styleUrls: ['./search-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true,
    },
  ],
})
export class SearchInputComponent implements ControlValueAccessor, Validator {
  @Input() placeholder: string = 'Search Medication';

  value: string = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  // Method to propagate the value change to the form control
  writeValue(value: string): void {
    if (value !== undefined && value !== this.value) {
      this.value = value;
    }
  }

  // Method to register change handler for the input
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Method to register the touched handler for the input
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Method to validate the input (optional)
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.trim().length < 3) {
      return { searchTooShort: true };
    }
    return null;
  }

  // Method called on input change (on user interaction)
  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
  }

  // Mark the input as touched when focus is lost
  onBlur(): void {
    this.onTouched();
  }
}
