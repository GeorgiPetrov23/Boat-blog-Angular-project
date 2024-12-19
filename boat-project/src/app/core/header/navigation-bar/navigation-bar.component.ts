import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }
  constructor(private router: Router,private userService: UserService) {}

  loggingOut(){
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  openProfile(){
    this.userService.getProfile().subscribe((user) => {
      
    })
  }
} 
