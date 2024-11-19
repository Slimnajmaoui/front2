




import { HeaderComponent } from '../../admin/header/header.component';
import { MenuComponent } from '../../admin/menu/menu.component';
import { FooterComponent } from '../../admin/footer/footer.component';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AffgroupeService } from '../affgroupe.service';
import { Affgroupe } from '../affgroupe';
import { Chart , registerables } from 'chart.js';
import { GroupeService } from '../../groupe/groupe.service';
Chart.register(...registerables);


@Component({
  selector: 'app-adminindexaffgroupe',
  standalone: true,
  imports: [CommonModule, RouterModule,FooterComponent,HeaderComponent,MenuComponent],
  templateUrl: './adminindexaffgroupe.component.html',
  styleUrl: './adminindexaffgroupe.component.css'
})
export class AdminindexaffgroupeComponent {
  nbroffre : any;
  nbretudiant :any;
  nbrwaiting : any;
  nbrhistory : any;
  nbrprogress : any;
  genreclient : any;
  nbrformation:any ;
  statusencours= 10;
  statusaccepter =30;
  statusrefuser =20;
  inscri:any ;
  user:any ;

  affgroupes: Affgroupe[] = [];
   aff:any ; 
   affuser:any ;
   profil:any ;
   nbrtotalaff:any ;
   nbrbyuseraff:any ;
   nbrtotalgroupe:any ;
   gr:any ;
   encours=0 ;
   valider=0 ;
   pasencore=0 ;
   
  constructor(public affgroupeService: AffgroupeService, private router: Router,public groupeService: GroupeService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.groupeService.getAll().subscribe((data: any)=>{
      this.gr = data;
      this.nbrtotalgroupe=data.length
    })  

    this.profil=localStorage.getItem("Role")
    this.affgroupeService.getAll().subscribe((data: any)=>{
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


    this.affgroupeService.getbyuser().subscribe((data: any)=>{
      this.affuser = data;
      this.nbrbyuseraff=data.length

    })  

  }
    
    
  RenderChart(encours: any, accepter: any, refuser: any) {
    console.log("........."+encours)
    console.log("***********"+accepter)
    console.log("//////////"+refuser)
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
  deleteAffgroupe(id:number){
    this.affgroupeService.delete(id).subscribe(res => {
         this.affgroupes = this.affgroupes.filter(item => item._id !== id);
         window.alert("supprimer avec succées")
         window.location.reload()
         console.log('Affgroupe deleted successfully!');
    })
  }
}
