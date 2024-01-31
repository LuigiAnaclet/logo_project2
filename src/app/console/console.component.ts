import { Component } from '@angular/core';
import { LogoInterpreterService } from 'src/services/logo-interpreter.service';
import { TurtleCommandsService } from 'src/services/turtle-commands.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent {
  code: string = '';
  output: string = '';

  constructor(private turtleService: TurtleCommandsService) {}

  executeCode() {
    // Split commands by a space followed by a capital letter (indicative of a new command)
    const commandsArray = this.code.split(/ (?=[A-Z])/);
    for (let cmd of commandsArray) {
        try {
            if (cmd.trim().toUpperCase() === "VT") {
                this.code = ''; // Clears the console input
                this.output = ''; // Clears the previous output
                continue; // Skips to the next command
            }
            const [result, command] = LogoInterpreterService.execute(cmd);
            this.output += result + '\n';
            this.turtleService.emitCommand(command);
        } catch (error) {
            this.output += (error as Error).message + '\n';
        }
    }
  }
}
