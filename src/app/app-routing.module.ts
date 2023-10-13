import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsoleComponent } from './console/console.component';
import { ScriptEditorComponent } from './script-editor/script-editor.component';
import { TurtleDisplayComponent } from './turtle-display/turtle-display.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/console', pathMatch: 'full' }, // Route par défaut
  { path: 'console', component: ConsoleComponent },
  { path: 'script-editor', component: ScriptEditorComponent },
  { path: 'turtle-display', component: TurtleDisplayComponent },
  { path: 'file-explorer', component: FileExplorerComponent },
  { path: 'chat', component: ChatComponent },
  // Ajoutez d'autres routes selon les besoins de votre projet
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
