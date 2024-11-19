



import { HeaderComponent } from '../../admin/header/header.component';
import { MenuComponent } from '../../admin/menu/menu.component';
import { FooterComponent } from '../../admin/footer/footer.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AffprojetService } from '../affprojet.service';
import { Affprojet } from '../affprojet';
import { ProjetService } from '../../projet/projet.service';
import { Chart , registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-adminindexaffprojet',
  standalone: true,
  imports: [CommonModule, RouterModule,FooterComponent,HeaderComponent,MenuComponent],
  templateUrl: './adminindexaffprojet.component.html',
  styleUrl: './adminindexaffprojet.component.css'
})
export class AdminindexaffprojetComponent {

profil:any ;


  affprojets: Affprojet[] = [];
aff:any ;    
pro:any ; 
affecteruser:any ;    
/*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public affprojetService: AffprojetService, private router: Router,public projetService: ProjetService) { }
  nbrtotalaff:any ;
  nbrbyuseraff:any ;
  nbrtotalprojet:any ;
  gr:any ;
  encours=0 ;
  valider=0 ;
  pasencore=0 ;
  
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.projetService.getAll().subscribe((data: any)=>{
      this.pro = data;
      this.nbrtotalprojet=data.length

    })  
    this.profil=localStorage.getItem("Role")
    this.affprojetService.getAll().subscribe((data: any)=>{
      this.aff = data;
      for (let index = 0; index < this.aff.length; index++) {
        const element = this.aff[index];
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
this.affprojetService.getaffectationprojetbyuser().subscribe((res)=>{
this.affecteruser=res ; 
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
  deleteAffprojet(id:number){
    this.affprojetService.delete(id).subscribe(res => {
         this.affprojets = this.affprojets.filter(item => item._id !== id);
         console.log('Affprojet deleted successfully!');
         window.alert("supprimer avec succées")
         window.location.reload()
    })
  }
}
