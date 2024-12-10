import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Title, By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockTitleService: jasmine.SpyObj<Title>;

  beforeEach(async () => {
    mockTitleService = jasmine.createSpyObj('Title', ['getTitle']);
    mockTitleService.getTitle.and.returnValue('Test Title');

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MatIconModule],
      providers: [{ provide: Title, useValue: mockTitleService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the computed title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toContain('Test Title');
  });

  it('should display the default title if the title service returns null', () => {
    mockTitleService.getTitle.and.returnValue(null as any);
    component['titleSignal'].set(null as any);
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toContain('Medication Tracker');
  });

  it('should emit toggleSidenav event when the button is clicked', () => {
    spyOn(component.toggleSidenav, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.toggleSidenav.emit).toHaveBeenCalled();
  });
});
