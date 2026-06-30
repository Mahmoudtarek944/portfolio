import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSkillCard } from './details-skill-card';

describe('DetailsSkillCard', () => {
  let component: DetailsSkillCard;
  let fixture: ComponentFixture<DetailsSkillCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSkillCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsSkillCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
