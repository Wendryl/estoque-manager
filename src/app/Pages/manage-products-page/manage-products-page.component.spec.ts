import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePostsPageComponent } from './manage-posts-page.component';

describe('ManagePostsPageComponent', () => {
  let component: ManagePostsPageComponent;
  let fixture: ComponentFixture<ManagePostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePostsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
