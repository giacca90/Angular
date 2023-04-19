import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinosViajeComponent } from './destinos-viaje.component';

describe('DestinosViajeComponent', () => {
  let component: DestinosViajeComponent;
  let fixture: ComponentFixture<DestinosViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinosViajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinosViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
