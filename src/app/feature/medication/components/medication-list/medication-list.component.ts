import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MOCK_MEDICATION_DATA } from '../../api/medication-mock-data';
import { Medication } from '../../api/medication.model';

import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from '@app/shared';
import { MedicationCreateComponent } from '../medication-create/medication-create.component';
import { DataStoreService } from '@app/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-medication-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    SearchInputComponent,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicationListComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly title = inject(Title);
  private readonly fb = inject(FormBuilder);
  displayedColumns: string[] = ['id', 'name', 'dosage', 'days', 'times', 'operator'];
  public readonly dataStore = inject(DataStoreService);
  dataSource = new MatTableDataSource<Medication>(this.dataStore.getItem('dataSource') || MOCK_MEDICATION_DATA);

  public searchForm!: FormGroup;

  ngOnInit(): void {
    this.title.setTitle('Medication');
    this.populateForm();
  }

  private populateForm() {
    this.searchForm = this.fb.group({
      search: [''],
    });

    this.searchForm.get('search')?.valueChanges.subscribe((value) => {
      this.applyFilter(value);
    });
  }

  private applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addData(): void {
    const dialogRef = this.dialog.open(MedicationCreateComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe({
      next: (model: Medication | null) => {
        if (model) {
          const newId = this.dataSource.data.length + 1;
          this.dataSource.data = [
            ...this.dataSource.data,
            {
              ...model,
              id: newId,
            },
          ];
        }
        this.updateDataStore()
      },
    });
  }

  updateData(model: Medication) {
    const dialogRef = this.dialog.open(MedicationCreateComponent, {
      width: '500px',
      data: model, 
    });
  
    dialogRef.afterClosed().subscribe({
      next: (updatedModel: Medication | null) => {
        if (updatedModel) {
          const index = this.dataSource.data.findIndex(item => item.id === updatedModel.id);
          
          if (index !== -1) {
            const updatedData = [...this.dataSource.data];
            updatedData[index] = updatedModel; 
            this.dataSource.data = updatedData;
            console.log(this.dataSource.data);
            
          }
        }
        this.updateDataStore(); 
      },
    });
  }
  

  private updateDataStore() {
    this.dataStore.setItem('dataSource', this.dataSource.data)
  }
}
