

import { HeaderComponent } from '../../admin/header/header.component';
import { MenuComponent } from '../../admin/menu/menu.component';
import { FooterComponent } from '../../admin/footer/footer.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
  
import { ChefdeprojetService } from '../chefdeprojet.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Chefdeprojet } from '../chefdeprojet';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
  

import { UserfooterComponent } from '../../user/userfooter/userfooter.component';
import { UserheaderComponent } from '../../user/userheader/userheader.component';
import { UsermenuComponent } from '../../user/usermenu/usermenu.component';

@Component({
  selector: 'app-usereditchefdeprojet',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,UserfooterComponent,UserheaderComponent,UsermenuComponent],
  templateUrl: './usereditchefdeprojet.component.html',
  styleUrl: './usereditchefdeprojet.component.css'
})
export class UsereditchefdeprojetComponent {



  
  id!: number;
  chefdeprojet!: Chefdeprojet;
  form!: FormGroup;
      
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public chefdeprojetService: ChefdeprojetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['chefdeprojetId'];
    this.chefdeprojetService.find(this.id).subscribe((data: Chefdeprojet)=>{
      this.chefdeprojet = data;
    }); 
        
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      motdepasse: new FormControl('', Validators.required)
    });
  }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.chefdeprojetService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Chefdeprojet updated successfully!');
         this.router.navigateByUrl('chefdeprojet/index');
    })
  }
  
}