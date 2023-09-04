import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorradorPage } from './borrador.page';

describe('BorradorPage', () => {
  let component: BorradorPage;
  let fixture: ComponentFixture<BorradorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BorradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
