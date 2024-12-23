



import { HeaderComponent } from '../../admin/header/header.component';
import { MenuComponent } from '../../admin/menu/menu.component';
import { FooterComponent } from '../../admin/footer/footer.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
  
import { CongeService } from '../conge.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
  
@Component({
  selector: 'app-admincreateconge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FooterComponent,HeaderComponent,MenuComponent],
  templateUrl: './admincreateconge.component.html',
  styleUrl: './admincreateconge.component.css'
})
export class AdmincreatecongeComponent {
  
  form!: FormGroup;
  profil:any ;    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public congeService: CongeService,
    private router: Router
  ) { }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.profil=localStorage.getItem("Role")
    this.form = new FormGroup({
    titre: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    etat: new FormControl('', [Validators.required]),
    datedebut: new FormControl('', [Validators.required]),
    datefin: new FormControl('', [Validators.required]),
    datecreation: new FormControl('', [Validators.required]),
    datemodification:  new FormControl('', [Validators.required])
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
    this.congeService.create(this.form.value).subscribe((res:any) => {
         console.log('Conge created successfully!');
         this.router.navigateByUrl('adminconge/index');
    })
  }
  
}
