import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ResetPassswordPage } from './reset-passsword.page';

describe('ResetPassswordPage', () => {
  let component: ResetPassswordPage;
  let fixture: ComponentFixture<ResetPassswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResetPassswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
