import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicEditComponentComponent } from './dynamic-edit-component.component';

describe('DynamicEditComponentComponent', () => {
  let component: DynamicEditComponentComponent;
  let fixture: ComponentFixture<DynamicEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicEditComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
