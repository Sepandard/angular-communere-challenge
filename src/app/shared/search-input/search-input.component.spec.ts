import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the initial value correctly from writeValue', () => {
    const initialValue = 'Aspirin';
    component.writeValue(initialValue);
    fixture.detectChanges();
    expect(component.value).toBe(initialValue);
    expect(inputElement.value).toBe(initialValue);
  });

  it('should call onChange when input value changes', () => {
    spyOn(component, 'onChange');
    inputElement.value = 'Ibuprofen';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.onChange).toHaveBeenCalledWith('Ibuprofen');
  });

  it('should call onTouched when input loses focus', () => {
    spyOn(component, 'onTouched');
    inputElement.dispatchEvent(new Event('blur'));
    expect(component.onTouched).toHaveBeenCalled();
  });


  it('should apply correct value to input on value change', () => {
    component.writeValue('Paracetamol');
    fixture.detectChanges();
    expect(inputElement.value).toBe('Paracetamol');
  });

  it('should propagate value changes to the parent form control', () => {
    spyOn(component, 'onChange');
    const newValue = 'New Medication';
    component.writeValue(newValue);
    fixture.detectChanges();

    inputElement.value = newValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.onChange).toHaveBeenCalledWith(newValue);
  });
});
