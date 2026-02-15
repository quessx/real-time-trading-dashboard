import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions-main-page',
  imports: [],
  templateUrl: './sessions-main-page.html',
  styleUrl: './sessions-main-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsMainPage {
    private router: Router = inject(Router);

    public onClickRedirectButton(sessionId: number): void {
        this.router.navigate([`session/${sessionId}`]);
    }
}
