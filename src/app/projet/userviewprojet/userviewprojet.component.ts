


import { HeaderComponent } from '../../admin/header/header.component';
import { MenuComponent } from '../../admin/menu/menu.component';
import { FooterComponent } from '../../admin/footer/footer.component';

import { Component } from '@angular/core';
  
import { ProjetService } from '../projet.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Projet } from '../projet';
import { UserfooterComponent } from '../../user/userfooter/userfooter.component';
import { UserheaderComponent } from '../../user/userheader/userheader.component';
import { UsermenuComponent } from '../../user/usermenu/usermenu.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-userviewprojet',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,UserfooterComponent,UserheaderComponent,UsermenuComponent],
  templateUrl: './userviewprojet.component.html',
  styleUrl: './userviewprojet.component.css'
})
export class UserviewprojetComponent {
  
  id!: number;
  projet!: Projet;
      
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['projetId'];
          
    this.projetService.find(this.id).subscribe((data: Projet)=>{
      this.projet = data;
    });
  }
  
}