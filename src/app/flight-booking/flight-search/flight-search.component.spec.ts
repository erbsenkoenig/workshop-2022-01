import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlightSearchComponent } from './flight-search.component';
import { FlightService } from './flight.service';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  let flightService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // ReactiveFormsModule
      declarations: [FlightSearchComponent],
      providers: [
        {
          provide: FlightService,
          useValue: {
            searchFlights: jasmine.createSpy(),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;

    flightService = TestBed.inject(FlightService);
  });

  it('should create', () => {
    // SETUP
    fixture.detectChanges(); // ONINIT
    expect(component).toBeTruthy();
  });

  it('should search for flights with from and to', fakeAsync(() => {
    const flights$ = new Subject();

    flightService.searchFlights.and.returnValue(flights$);

    component.from = 'FROM';
    component.to = 'TO';

    fixture.detectChanges();

    const buttonElem = fixture.debugElement.query(By.css('button'));
    expect(buttonElem.properties['disabled']).toBeFalsy();
    buttonElem.triggerEventHandler('click', null);

    expect(flightService.searchFlights).toHaveBeenCalledWith('FROM', 'TO');

    flights$.next([{ id: 'FLIGHT_ID' }]);
    tick(); // please wait for any pending async actions

    expect(component.flights).toEqual([{ id: 'FLIGHT_ID' }] as any);
  }));

  it('should have flight card for flights', () => {
    component.flights = [{ id: 'FLIGHT_ID' }] as any;
    component.basket = { FLIGHT_ID: 'SELECTED', OTHER_FLIGHT_ID: 'UNSELECTED' };

    fixture.detectChanges();

    const flightCardElem = fixture.debugElement.query(By.css('app-flight-card'));
    expect(flightCardElem.properties['flight']).toEqual({ id: 'FLIGHT_ID' });
    expect(flightCardElem.properties['selected']).toEqual('SELECTED');
  });

  it('should update basked on selection change of flight card', () => {
    component.flights = [{ id: 'FLIGHT_ID' }] as any;

    fixture.detectChanges();

    const flightCardElem = fixture.debugElement.query(By.css('app-flight-card'));
    flightCardElem.triggerEventHandler('selectedChange', 'UNSELECTED');

    expect(component.basket).toEqual({ FLIGHT_ID: 'UNSELECTED' });
  });

  it('search should be disabled if from empty', () => {
    component.to = 'TO';
    fixture.detectChanges();

    const searchButton = fixture.debugElement.query(By.css('button'));

    expect(searchButton.properties['disabled']).toBeTruthy();
  });

  it('search should be disabled if to empty', () => {
    component.to = 'TO';
    fixture.detectChanges();

    const searchButton = fixture.debugElement.query(By.css('button'));

    expect(searchButton.properties['disabled']).toBeTruthy();
  });
});
