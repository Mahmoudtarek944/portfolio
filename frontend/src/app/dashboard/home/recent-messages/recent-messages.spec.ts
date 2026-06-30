import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentMessages } from './recent-messages';

describe('RecentMessages', () => {
  let component: RecentMessages;
  let fixture: ComponentFixture<RecentMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentMessages],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentMessages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
