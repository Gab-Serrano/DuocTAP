import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenQrPage } from './gen-qr.page';

describe('GenQrPage', () => {
  let component: GenQrPage;
  let fixture: ComponentFixture<GenQrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
