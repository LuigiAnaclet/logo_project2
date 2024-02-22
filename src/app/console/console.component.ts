import { Component } from '@angular/core';
import { LogoInterpreterService } from 'src/app/services/logo-interpreter.service';
import { TurtleCommandsService } from 'src/app/services/turtle-commands.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent {
  code: string = '';
  output: string = '';

  constructor(private turtleService: TurtleCommandsService,private logoInterpreterService: LogoInterpreterService,private fileService: FileService) {}

  executeCode() {
    // This regex matches individual commands or REPETE blocks as single elements.
    const commandRegex = /(?:REPETE \d+ \[.*?\])|[A-Z]+\s+[^[\]]+(?=\s+[A-Z]|$)/g;
    const commandsArray = this.code.match(commandRegex);
    if (!commandsArray) {
      this.output += 'No commands found or incorrect command format.\n';
      return;
    }
  
    for (let cmd of commandsArray) {
      try {
        if (cmd.toUpperCase().startsWith('POUR')) {
            this.logoInterpreterService.defineProcedure(this.code);
            this.output += 'Procedure defined.\n';
            break;
          }
        else if (cmd.trim().toUpperCase() === "VT") {
          this.code = '';
          this.output = '';
          continue;
        }
        const result = this.logoInterpreterService.execute(cmd);
        this.output += result + '\n'; // Make sure execute() returns a string
      } catch (error) {
        this.output += (error as Error).message + '\n';
      }
    }
  }

  saveCodeToFile() {
    const filename = 'my-logo-code.txt';
    this.fileService.saveToFile(this.code, filename);
  }
  
  readFile(fileList: FileList | null) {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      this.fileService.readFromFile(file).then(content => {
        this.code = content;
      }).catch(error => {
        console.error('Error reading file:', error);
      });
    }
  }
  
}
