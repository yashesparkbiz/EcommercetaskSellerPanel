import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  public logout = () => {
    debugger
    this.authService.logout();
    this.router.navigate([""]);
  }
}