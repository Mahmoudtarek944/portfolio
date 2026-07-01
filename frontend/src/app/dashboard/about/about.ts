import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/service/profile.service';
import { IHome } from '../../core/model/home.model';
import { IAbout } from '../../core/model/about.model';
import { IContact } from '../../core/model/contact.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { showSuccedAdded } from '../../core/util/alert';

@Component({
  selector: 'app-about',
  imports: [ReactiveFormsModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  constructor(
    private __profileService: ProfileService,
    private _cdr: ChangeDetectorRef,
  ) {}

  dataHome!: IHome;
  dataAbout!: IAbout;
  dataContact!: IContact;

  formData = new FormData();

  myForm = new FormGroup({
    image: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    github: new FormControl('', Validators.required),
    linkedin: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    projects: new FormControl('', Validators.required),
  });

  firstTwoChar: string = '';

  apiDataAbout = 'http://localhost:3000/upload/';

  selectedFile: File | null = null;
  previewUrl: string = '';
  selectedFileName = '';
  selcetedImage!: string;

  ngOnInit(): void {
    // to async when we get data from any endpoint , add it in the form "update the inital value"
    this.__profileService.getProfileFromHome().subscribe((value) => {
      this.dataHome = value;
      const username = this.dataHome.name.split(' ');
      console.log(username, username[0][0], username[username.length - 1][0]);
      this.firstTwoChar = username[0][0] + username[username.length - 1][0];
      console.log(this.firstTwoChar);

      this.myForm.patchValue({
        name: this.dataHome.name,
        github: this.dataHome.github,
        linkedin: this.dataHome.linkedin,
      });
      this._cdr.detectChanges();
    });
    this.__profileService.getProfileFromAbout().subscribe((value) => {
      this.dataAbout = value;
      console.log(this.dataAbout);
      console.log(this.dataAbout.experience);

      this.previewUrl = this.apiDataAbout + this.dataAbout?.image; // added photo
      this.myForm.patchValue({
        image: this.dataAbout.image,
        title: this.dataAbout.title,
        description: this.dataAbout.description,
        experience: this.dataAbout.experience,
        projects: this.dataAbout.projects,
      });
      this._cdr.detectChanges();
    });
    this.__profileService.getProfileFromContact().subscribe((value) => {
      this.dataContact = value;
      console.log(this.dataContact);

      this.myForm.patchValue({
        email: this.dataContact.email,
        location: this.dataContact.location,
      });
      this._cdr.detectChanges();
    });

    console.log(this.myForm.value);
    this._cdr.detectChanges();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.selectedFile = file;
    this.selectedFileName = file.name;

    const reader = new FileReader(); // to change immediatlly
    reader.onload = () => {
      this.previewUrl = reader.result as string;
      this._cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  updateAbout() {
    const formData = new FormData();

    if (this.selectedFile) {
      // change the data of image
      formData.append('image', this.selectedFile, this.selectedFile.name);
    } else {
      formData.append('image', this.dataAbout?.image || '');
    }

    // formData.append('image', this.selcetedImage);
    formData.append('title', this.myForm.value.title || '');
    formData.append('description', this.myForm.value.description || '');

    formData.append('experience', this.myForm.value.experience || '');
    formData.append('projects', this.myForm.value.projects || '');

    this.__profileService.updateProfileFromAbout(formData).subscribe({
      next: (res) => {
        console.log(res);
        if (res?.image) {
          this.previewUrl = this.apiDataAbout + res.image;
          this.selectedFile = null;
          this._cdr.detectChanges();
        }
      },
    });
  }
  onSubmit() {
    console.log(this.myForm.value.name);
    this.__profileService
      .updateProfileFromHome({
        name: this.myForm.value.name,
        github: this.myForm.value.github,
        linkedin: this.myForm.value.linkedin,
      })
      .subscribe();

    this.updateAbout();

    this.__profileService
      .updateProfileFromContact({
        email: this.myForm.value.email,
        location: this.myForm.value.location,
      })
      .subscribe();
    showSuccedAdded('Changes');
    this._cdr.detectChanges();
  }
}
