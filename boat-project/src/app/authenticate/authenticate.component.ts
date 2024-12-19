import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-authenticate',
  imports: [],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit{
  isAuth = true;
  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuth = false;
      },
      error: () => {
        this.isAuth = false;
      },
      complete: () => {
        this.isAuth = false;
      },
    })
  }
}
