import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactiesComponent } from './transacties.component';

describe('TransactiesComponent', () => {
  let component: TransactiesComponent;
  let fixture: ComponentFixture<TransactiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
