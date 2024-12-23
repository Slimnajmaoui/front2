

import { HeaderComponent } from '../../admin/header/header.component';
import { MenuComponent } from '../../admin/menu/menu.component';
import { FooterComponent } from '../../admin/footer/footer.component';
import { Component } from '@angular/core';
  
import { CongeService } from '../conge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Conge } from '../conge';
  
@Component({
  selector: 'app-adminviewconge',
  standalone: true,
  imports: [FooterComponent,HeaderComponent,MenuComponent],
  templateUrl: './adminviewconge.component.html',
  styleUrl: './adminviewconge.component.css'
})
export class AdminviewcongeComponent {

  
  id!: number;
  conge!: Conge;
  c:any ;    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public congeService: CongeService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
          
    this.congeService.find(this.id).subscribe((data: any)=>{
      this.c = data;
    });
  }
  
}
