



import { HeaderComponent } from '../../admin/header/header.component';
import { MenuComponent } from '../../admin/menu/menu.component';
import { FooterComponent } from '../../admin/footer/footer.component';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AfftacheService } from '../afftache.service';
import { Afftache } from '../afftache';
import { TacheService } from '../../tache/tache.service';

import { Chart , registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-adminindexafftache',
  standalone: true,
  imports: [CommonModule, RouterModule,FooterComponent,HeaderComponent,MenuComponent],
  templateUrl: './adminindexafftache.component.html',
  styleUrl: './adminindexafftache.component.css'
})
export class AdminindexafftacheComponent {

  afftaches: Afftache[] = [];
  tach :any ;  
  profil:any ;
  a:any ;
  
  nbrtotalaff:any ;
  nbrbyuseraff:any ;
  nbrtotaltache:any ;
  tache:any ;
  encours=0 ;
  valider=0 ;
  pasencore=0 ;
  
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public afftacheService: AfftacheService, private router: Router,public tacheService: TacheService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.tacheService.getAll().subscribe((data: any)=>{
      this.tache = data;
      this.nbrtotaltache=data.length
    })  
    this.profil=localStorage.getItem("Role");
    this.afftacheService.getAll().subscribe((data: any)=>{
      this.tach = data;
      for (let index = 0; index < this.tach.length; index++) {
        const element = this.tach[index];
        if(element.etat=="1"){
          this.encours++;
        }
        else if(element.etat=="2"){
          this.valider++;
        }
        else if(element.etat=="3"){
          this.pasencore++;
        }
      }
     
      this.nbrtotalaff=data.length
      this.RenderChart(this.encours,this.valider, this.pasencore);

    })
    this.afftacheService.affectationtachebyuser().subscribe((res)=>{
      this.a=res ; 
      this.nbrbyuseraff=res.length
    })  
  }
  RenderChart(encours: any, accepter: any, refuser: any) {

    const chartId = 'piechart';
    const existingChart = Chart.getChart(chartId);
  
    // Détruire le graphique existant s'il en existe un
    if (existingChart) {
      existingChart.destroy();
    }
  


    const myChart = new Chart(chartId, {
      type: 'bar',
      data: {
        labels: ['En cours', 'Valider', 'Pas Encore'],
        datasets: [{
            label : '',
          data: [encours, accepter, refuser],
          backgroundColor: [
            'rgba(255, 153, 0, 1)',
            '#175781',
            'grey'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
            y:{
                beginAtZero:true,
                ticks: {
                    stepSize: 1
                }
            }
        }
      }
    
    });
  
}

    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteAfftache(id:number){
    this.afftacheService.delete(id).subscribe(res => {
         this.afftaches = this.afftaches.filter(item => item._id !== id);
         window.alert('Afftache deleted successfully!');
         window.location.reload()
    })
  }
}
