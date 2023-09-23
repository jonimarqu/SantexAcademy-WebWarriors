import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { DashboardServicesService } from '../services/dashboard-services.service';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  constructor(
    private authServices: AuthService,
    private dashService: DashboardServicesService,
    private router: Router
  ) {}

  dataUser: any = {};

  ngOnInit(): void {
    const token = this.authServices.getAuthToken();
    if (!token) {
      this.router.navigate(['/']);
    } else {
      this.dashService.getProfileVolunteer(token).subscribe({
        next: (response) => {
          this.dataUser = response;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      });
    }
  }
}
