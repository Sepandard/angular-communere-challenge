import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { Medication, Unit } from '../../api/medication.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ResponsiveLayoutService } from '@app/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-medication-create',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './medication-create.component.html',
  styleUrl: './medication-create.component.scss',
})
export class MedicationCreateComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  public readonly responsive = inject(ResponsiveLayoutService);
  public dialogRef = inject(MatDialogRef<MedicationCreateComponent>);
  public data: Medication = inject(MAT_DIALOG_DATA);
  unitOptions = Object.values(Unit);
  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  public form!: FormGroup;

  ngOnInit(): void {
    this.populateForm();
  }

  private populateForm() {
    this.form = this.fb.group({
      id: [-1],
      name: ['', [Validators.required]],
      dosage: [null, [Validators.required, Validators.min(0)]],
      unit: [null, [Validators.required]],
      days: [null, [Validators.required]],
      times: this.fb.array([]),
    });
    this.patchData();
  }

  private patchData() {
    console.log(this.data);

    if (this.data) {
      this.form.patchValue({ ...this.data });
      this.data.times.forEach((element) => {
        this.addTime(element);
      });
    }
  }

  get times(): FormArray {
    return this.form.get('times') as FormArray;
  }

  get days(): FormArray<FormControl<boolean>> {
    return this.form.get('days') as FormArray<FormControl<boolean>>;
  }

  addTime(initialValue: string = ''): void {
    this.times.push(
      this.fb.group({
        time: [initialValue, [Validators.required]],
      }),
    );
  }

  removeTime(index: number): void {
    this.times.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const formData = this.form.getRawValue();
    formData.days = this.daysOfWeek.filter((_, index) => formData.days[index]);
    formData.times = this.times.value.map((item: { time: string }) => item.time);
    this.dialogRef.close(formData);
  }
}
