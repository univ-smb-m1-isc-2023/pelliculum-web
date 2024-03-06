import { Component, OnInit } from '@angular/core';
import { InputCustomComponent } from '../../../../shared/components/input-custom/input-custom.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: 'app-profile-customization-tab',
    standalone: true,
    imports: [InputCustomComponent, ReactiveFormsModule, NgOptimizedImage],
    templateUrl: './profile-customization-tab.component.html',
    styleUrls: ['./profile-customization-tab.component.sass']
})
export class ProfileCustomizationTabComponent implements OnInit {
    imageUrl: string | undefined;

    profileForm = new FormGroup({
        firstname: new FormControl('John', [Validators.required]),
        lastname: new FormControl('Doe', [Validators.required]),
        email: new FormControl({ value: 'john.doe@gmail.com', disabled: true }, [Validators.required, Validators.email]),
        username: new FormControl('JohnnyDowy', [Validators.required])
    });

    photo: SafeUrl = 'https://www.w3schools.com/howto/img_avatar.png';
    selectedFile: File | null = null;
    user: any;

    constructor(
        private sanitizer: DomSanitizer,
        private userService: UserService
    ) {}

    async ngOnInit() {
        this.user = await this.userService.get();
        this.profileForm.patchValue({
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            username: this.user.username
        });
        this.getUserProfilePicture();
    }

    async save() {
        const response = await this.userService.update({
            firstname: this.profileForm.get('firstname')?.value,
            lastname: this.profileForm.get('lastname')?.value,
            username: this.profileForm.get('username')?.value,
            email: this.profileForm.get('email')?.value
        });
        console.log(response);

        if (this.selectedFile) {
            const response = await this.userService.updateProfilePicture(this.selectedFile);
            console.log(response);
        }
    }

    onFileSelected(event: any): void {
        if (event.target.files && event.target.files[0]) {
            this.selectedFile = event.target.files[0];

            const reader = new FileReader();
            reader.onload = (e: any) => (this.photo = this.sanitizer.bypassSecurityTrustUrl(e.target.result));
            reader.readAsDataURL(this.selectedFile!);
        }
    }

    getUserProfilePicture() {
        const username = this.user.getUsername(); // Assurez-vous d'avoir le nom d'utilisateur
        this.imageUrl = `http://localhost:8080/profilePictures/${username}.jpeg`;
    }
}
