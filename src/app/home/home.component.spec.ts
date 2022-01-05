import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // SETUP
    fixture.detectChanges(); // ONINIT
    expect(component).toBeTruthy();
  });

  it('should have initial count of 0', () => {
    fixture.detectChanges();

    expect(component.count).toEqual(0);

    const counterElem = fixture.debugElement.query(By.css('[data-testid="counter"]'));
    expect(counterElem.nativeElement.textContent).toContain('Counter: 0');

    const decreaseButton = fixture.debugElement.query(By.css('[data-testid="btn-decrease"]'));
    expect(decreaseButton.properties['disabled']).toBeTruthy();

    expect(decreaseButton.attributes['id']).toEqual('decrease-button');
  });

  it('should increase count by one if button clicked', () => {
    fixture.detectChanges(); // Change Detection + OnInit

    expect(component.count).toEqual(0);

    const increaseButton = fixture.debugElement.query(By.css('[data-testid="btn-increase"]'));
    increaseButton.triggerEventHandler('click', null);

    expect(component.count).toEqual(1);

    fixture.detectChanges(); // Change Detection

    const counterElem = fixture.debugElement.query(By.css('[data-testid="counter"]'));
    expect(counterElem.nativeElement.textContent).toContain('Counter: 1');
  });

  it('should decrease count by one if button clicked', () => {
    component.count = 3;
    fixture.detectChanges(); // Change Detection + OnInit

    expect(component.count).toEqual(3);

    const decreaseButton = fixture.debugElement.query(By.css('[data-testid="btn-decrease"]'));
    decreaseButton.triggerEventHandler('click', null);

    expect(component.count).toEqual(2);

    fixture.detectChanges(); // Change Detection

    const counterElem = fixture.debugElement.query(By.css('[data-testid="counter"]'));
    expect(counterElem.nativeElement.textContent).toContain('Counter: 2');
  });

  it('should not decrease count if count is 0', () => {
    fixture.detectChanges(); // Change Detection + OnInit

    const decreaseButton = fixture.debugElement.query(By.css('[data-testid="btn-decrease"]'));
    decreaseButton.triggerEventHandler('click', null);

    expect(component.count).toEqual(0);
  });
});
