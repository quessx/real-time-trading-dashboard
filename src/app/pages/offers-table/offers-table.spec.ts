import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersTable } from './offers-table';

describe('OffersTable', () => {
  let component: OffersTable;
  let fixture: ComponentFixture<OffersTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
