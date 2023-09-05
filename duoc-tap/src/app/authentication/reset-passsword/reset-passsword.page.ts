import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-passsword',
  templateUrl: './reset-passsword.page.html',
  styleUrls: ['./reset-passsword.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ResetPassswordPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
