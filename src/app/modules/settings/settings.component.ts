import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../../core/services/user.service';
import { Response } from '../../shared/models/response.model';
import { IUser } from '../../shared/models/user.model';
import { StarsHoverableComponent } from '../../shared/components/stars-hoverable/stars-hoverable.component';

@Component({
    selector: 'app-settings',
    standalone: true,
  imports: [ReactiveFormsModule, StarsHoverableComponent],
    templateUrl: './settings.component.html'
})
export class SettingsComponent {

    protected profileForm = new FormGroup({
        firstname: new FormControl('John', [Validators.required]),
        lastname: new FormControl('Doe', [Validators.required]),
        email: new FormControl({ value: 'john.doe@gmail.com', disabled: true }, [Validators.required, Validators.email]),
        username: new FormControl('JohnnyDowy', [Validators.required])
    });

    protected imageUrl: string | undefined;
    protected photo: SafeUrl = 'https://www.w3schools.com/howto/img_avatar.png';
    protected selectedFile: File | null = null;
    user: any;

    constructor(
        private sanitizer: DomSanitizer,
        private userService: UserService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.user = await this.userService.get();
        this.profileForm.patchValue(this.user);
        this.photo = this.user.getProfileImage();
    }

    public async save(): Promise<void> {
        const responseUpdate: Response<IUser> = await this.userService.update({
            firstname: this.profileForm.get('firstname')?.value,
            lastname: this.profileForm.get('lastname')?.value,
            username: this.profileForm.get('username')?.value,
            email: this.profileForm.get('email')?.value
        });
        if (!this.selectedFile) return;
        const responseProfile: Response<IUser > = await this.userService.updateProfilePicture(this.selectedFile);

    }

    public onFileSelected(event: any): void {
        if (!event.target.files || !event.target.files[0]) return
        this.selectedFile = event.target.files[0];
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => (this.photo = this.sanitizer.bypassSecurityTrustUrl(e.target.result));
        reader.readAsDataURL(this.selectedFile!);
    }
}
