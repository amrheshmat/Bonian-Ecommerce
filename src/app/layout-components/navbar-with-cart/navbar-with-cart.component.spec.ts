import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWithCartComponent } from './navbar-with-cart.component';

describe('NavbarWithCartComponent', () => {
  let component: NavbarWithCartComponent;
  let fixture: ComponentFixture<NavbarWithCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarWithCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarWithCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
