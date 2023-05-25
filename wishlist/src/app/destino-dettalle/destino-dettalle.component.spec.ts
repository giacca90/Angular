import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoDettalleComponent } from './destino-dettalle.component';

describe('DestinoDettalleComponent', () => {
  let component: DestinoDettalleComponent;
  let fixture: ComponentFixture<DestinoDettalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinoDettalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinoDettalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
