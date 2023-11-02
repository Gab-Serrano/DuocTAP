import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenQrService } from '../../../services/gen-qr.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-gen-qr',
  templateUrl: './gen-qr.page.html',
  styleUrls: ['./gen-qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GenQrPage implements OnInit {

  code: string = "";

  constructor(private genQrServ: GenQrService) { }

  ngOnInit() {}

  async generateCode() {
    const sessionId = this.generateAlphanumericCode(6);
    const currentUserId = (await Preferences.get({ key: 'currentUserId' })).value?.toString();

    if (currentUserId) {
      await this.genQrServ.storeSessionInDatabase(sessionId, currentUserId);
      this.code = sessionId;
    } else {
      console.error('currentUserId is undefined');
    }
  }

  generateAlphanumericCode(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

}