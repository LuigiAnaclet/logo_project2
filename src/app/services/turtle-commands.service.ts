import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface CommandAction {
  action: string;
  params: any[];
}

@Injectable({
  providedIn: 'root',
})
export class TurtleCommandsService {
  private commandsSubject = new Subject<CommandAction>();
  public commands$ = this.commandsSubject.asObservable();

  emitCommand(command: CommandAction): void {
    this.commandsSubject.next(command);
  }
}

