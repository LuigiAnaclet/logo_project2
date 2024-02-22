import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-console></app-console>
      <app-turtle-display></app-turtle-display>
      <app-file-explorer></app-file-explorer>
      <app-chat></app-chat>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
