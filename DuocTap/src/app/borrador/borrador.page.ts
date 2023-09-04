import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-borrador',
  templateUrl: './borrador.page.html',
  styleUrls: ['./borrador.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BorradorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
