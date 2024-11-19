


import { HeaderComponent } from '../../admin/header/header.component';
import { MenuComponent } from '../../admin/menu/menu.component';
import { FooterComponent } from '../../admin/footer/footer.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ChefdeprojetService } from '../chefdeprojet.service';
import { Chefdeprojet } from '../chefdeprojet';


@Component({
  selector: 'app-adminindexchefdeprojet',
  standalone: true,
  imports: [CommonModule, RouterModule,FooterComponent,HeaderComponent,MenuComponent],
  templateUrl: './adminindexchefdeprojet.component.html',
  styleUrl: './adminindexchefdeprojet.component.css'
})
export class AdminindexchefdeprojetComponent {

  chefdeprojets: Chefdeprojet[] = [];
    chef:any ;
    nbrtotal:any ;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public chefdeprojetService: ChefdeprojetService, private router: Router) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.chefdeprojetService.getbyprofil().subscribe((data: any)=>{
      this.chef = data;
      this.nbrtotal=data.length
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteChefdeprojet(id:number){
    this.chefdeprojetService.delete(id).subscribe(res => {
         this.chefdeprojets = this.chefdeprojets.filter(item => item._id !== id);
         console.log('Chefdeprojet deleted successfully!');
    })
  }
}
