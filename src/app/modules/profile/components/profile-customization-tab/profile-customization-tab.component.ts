import { Component, OnInit } from '@angular/core';
import { InputCustomComponent } from '../../../../shared/components/input-custom/input-custom.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UsersService } from '../../../../core/services/users.service';
import { AxiosService } from '../../../../core/services/axios.service';
import axios from 'axios';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-profile-customization-tab',
    standalone: true,
    imports: [InputCustomComponent, ReactiveFormsModule, NgOptimizedImage],
    templateUrl: './profile-customization-tab.component.html',
    styleUrls: ['./profile-customization-tab.component.sass']
})
export class ProfileCustomizationTabComponent implements OnInit{

    profileForm = new FormGroup({
        firstname: new FormControl('John', [Validators.required]),
        lastname: new FormControl('Doe', [Validators.required]),
        email: new FormControl({value: 'john.doe@gmail.com', disabled: true}, [Validators.required, Validators.email]),
        username: new FormControl('JohnnyDowy', [Validators.required]),
    });

    user: any = null;
    photo: SafeUrl = 'https://www.w3schools.com/howto/img_avatar.png';
    selectedFile: File | null = null;

    constructor(private sanitizer: DomSanitizer, private users: UsersService, private axiosService: AxiosService) {}

    async ngOnInit() {
        this.user = await this.users.get(this.axiosService.getUsername()!)
        this.profileForm.patchValue({
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            username: this.user.username
        });
    }

    async save() {
        const response = await this.users.update(this.axiosService.getUsername()!, {
            firstname: this.profileForm.get('firstname')?.value,
            lastname: this.profileForm.get('lastname')?.value,
            username: this.profileForm.get('username')?.value,
            email: this.profileForm.get('email')?.value,
        });
        console.log(response)
    }

    onFileSelected(event: any): void {
        if (event.target.files && event.target.files[0]) {
            this.selectedFile = event.target.files[0];

            const reader = new FileReader();
            reader.onload = (e: any) => this.photo = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
            reader.readAsDataURL(this.selectedFile!);
        }
    }

}
