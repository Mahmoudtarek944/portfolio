import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SkillService } from '../../core/service/skill.service';
import { ISkill } from '../../core/model/skill.model';
import { SkillCard } from './skill-card/skill-card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-skills',
  imports: [SkillCard, ReactiveFormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  constructor(
    private __skillService: SkillService,
    private _cdr: ChangeDetectorRef,
  ) {}

  mySkills: ISkill[] = [];

  ngOnInit(): void {
    this.__skillService.getData().subscribe((value: ISkill[]) => {
      this.mySkills = value;
      console.log(this.mySkills);
      this._cdr.detectChanges();
    });
  }

  isModalOpen = false;
  modalMode: 'add' | 'update' = 'add';
  selectedCatId!: string;
  selectedSkillIndex!: number;

  myForm: FormGroup = new FormGroup({
    category: new FormControl(''),
    skillName: new FormControl('', Validators.required),
    percentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
  });

  openModal() {
    this.modalMode = 'add';

    this.myForm.get('category')?.setValidators([Validators.required]);
    this.myForm.get('category')?.updateValueAndValidity();

    this.myForm.reset({
      skillName: '',
      percentage: '',
    });
    this.isModalOpen = true;
    this._cdr.detectChanges();
  }

  onDeleteSkill(event: { catId: string; index: number }) {
    this.__skillService.deleteDate(event.catId, event.index).subscribe({
      next: (updatedCategory) => {
        if (!updatedCategory.skills || updatedCategory.skills.length === 0) {
          this.mySkills = this.mySkills.filter((cat) => cat._id !== event.catId);
        } else {
          this.mySkills = this.mySkills.map((cat) =>
            cat._id === event.catId ? updatedCategory : cat,
          );
        }
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Delete failed:', err);
      },
    });
  }

  onEditSkill(event: { catId: string; index: number; skill: any }) {
    this.modalMode = 'update';
    this.selectedCatId = event.catId;
    this.selectedSkillIndex = event.index;

    this.myForm.patchValue({
      skillName: event.skill.skillName,
      percentage: event.skill.percentage,
    });

    this.isModalOpen = true;
    this._cdr.detectChanges();
  }
  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const formVal = this.myForm.value;

    if (this.modalMode === 'update') {
      const updateBody = { skillName: formVal.skillName, percentage: formVal.percentage };
      this.__skillService
        .updateSubSkill(this.selectedCatId, this.selectedSkillIndex, updateBody)
        .subscribe((updatedCategory) => {
          this.mySkills = this.mySkills.map((cat) =>
            cat._id === this.selectedCatId ? updatedCategory : cat,
          );
          this.closeModal();
          this._cdr.detectChanges();
        });
    } else if (this.modalMode === 'add') {
      const addBody = {
        category: formVal.category,
        skills: [{ skillName: formVal.skillName, percentage: formVal.percentage }],
      };

      this.__skillService.addData(addBody).subscribe((newOrUpdatedCategory) => {
        const isExist = this.mySkills.some((cat) => cat.category === newOrUpdatedCategory.category);

        if (isExist) {
          this.mySkills = this.mySkills.map((cat) =>
            cat.category === newOrUpdatedCategory.category ? newOrUpdatedCategory : cat,
          );
        } else {
          this.mySkills = [...this.mySkills, newOrUpdatedCategory];
        }

        this.closeModal();
        this._cdr.detectChanges();
      });
    }
  }
}
