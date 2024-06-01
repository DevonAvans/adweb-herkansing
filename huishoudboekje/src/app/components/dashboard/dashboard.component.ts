import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Observable } from 'rxjs';
import { Huishoudboekje } from '@models/huishoudboekje';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { QuerySnapshot, collection, onSnapshot, query, where } from 'firebase/firestore';
import { HuishoudboekjeService } from '@services/huishoudboekje.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  ownHuishoudboekjes$: Observable<Array<Huishoudboekje>>;
  participantHoudboekjes$: Observable<Array<Huishoudboekje>>;
  newHuishoudboekje: Huishoudboekje = {
    name: '',
    description: '',
    owner: '',
    archive: false,
    participants: [],
  };
  showArchived: boolean = false;

  constructor(
    private huishoudboekjeService: HuishoudboekjeService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    var userEmail = userService.getCurrentUser();

    this.ownHuishoudboekjes$ = huishoudboekjeService.readHuishoudboekjesByOwner(
      userEmail,
      this.showArchived
    );

    this.participantHoudboekjes$ = huishoudboekjeService.readHuishoudboekjesByParticipant(
      userEmail,
      this.showArchived
    );
  }
}
