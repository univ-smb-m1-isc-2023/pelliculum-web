import { Component } from '@angular/core';
import { InputCustomComponent } from '../../../../shared/components/input-custom/input-custom.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-profile-customization-tab',
    standalone: true,
    imports: [InputCustomComponent],
    templateUrl: './profile-customization-tab.component.html',
    styleUrls: ['./profile-customization-tab.component.sass']
})
export class ProfileCustomizationTabComponent {
    name = 'Paul';
    lastname = 'Smith';
    email = 'paul.smith@gmail.com';
    photo = 'https://www.w3schools.com/howto/img_avatar.png';
    pseudo = 'paulsmith';

    tempSrc: SafeUrl | string = this.photo; // Lien vers l'image par défaut

    constructor(private sanitizer: DomSanitizer) {}

    onFileSelected(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.tempSrc = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    }

    onFileSaved() {
        this.photo = this.tempSrc as string;
    }
}
