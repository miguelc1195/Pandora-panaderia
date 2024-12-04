import { Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Pandora-panaderia';
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/catalogo']));
  }
}
