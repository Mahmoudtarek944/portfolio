import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCardDetails } from './skill-card-details';

describe('SkillCardDetails', () => {
  let component: SkillCardDetails;
  let fixture: ComponentFixture<SkillCardDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCardDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCardDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
