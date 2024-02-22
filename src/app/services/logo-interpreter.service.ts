import { Injectable } from '@angular/core';
import { TurtleCommandsService } from './turtle-commands.service';
import { FileService } from './file.service';

export interface LogoCommand {
  action: string;
  params: any[];
}
export interface LogoProcedure {
  params: string[];
  body: string[];
}

@Injectable({
  providedIn: 'root',
})
export class LogoInterpreterService {
  private procedures: { [key: string]: LogoProcedure } = {}; 

  constructor(private turtleCommandsService: TurtleCommandsService, private fileService: FileService) {}

  execute(commandString: string): string {
    const trimmedCommand = commandString.trim();
    if (this.procedures[commandString.split(' ')[0].toUpperCase()]) {
      const parts = commandString.split(' ');
      const name = parts[0].toUpperCase();
      const args = parts.slice(1);
      return this.executeProcedure(name, ...args);
    } else if (trimmedCommand.toUpperCase().startsWith('POUR')) {
      this.defineProcedure(trimmedCommand);
      return("Procédure définie");
    } else if (trimmedCommand.toUpperCase().startsWith('REPETE')) {
      this.handleRepeteCommand(trimmedCommand);
      return(trimmedCommand);
    } else {
      this.executeBlock(trimmedCommand);
      return(trimmedCommand); 
    }
  }

  private handleRepeteCommand(repeteCommand: string) {
    const match = repeteCommand.match(/^REPETE (\d+) \[(.*)\]$/i);
    if (match) {
      const count = parseInt(match[1], 10);
      const commandsBlock = match[2].split('] [').join(' ');
      for (let i = 0; i < count; i++) {
        this.executeBlock(commandsBlock);
      }
    } else {
      console.error('REPETE command is not formatted correctly.');
    }
  }

  private executeBlock(commandsBlock: string) {
    const commands = commandsBlock.split(/ (?=[A-Z])/); 
    commands.forEach(command => {
      const [action, ...params] = command.trim().split(/\s+/);
      this.emitCommand(action, params);
    });
  }

  private emitCommand(action: string, stringParams: string[]) {
    const params = stringParams.map(param => isNaN(Number(param)) ? param : Number(param));
    this.turtleCommandsService.emitCommand({ action, params });
  }
  
  
  defineProcedure(command: string) {
    console.log(command);
    command = command.trim();
    const lines = command.split('\n');
    console.log(lines);
    const headerMatch = lines[0].match(/^POUR (\w+)\s*(.*)/);
    
    if (!headerMatch) {
      throw new Error('Invalid procedure definition');
    }
  
    const procedureName = headerMatch[1].toUpperCase();
    const paramsMatch = headerMatch[2] ? headerMatch[2].trim().match(/:(\w+)/g) : [];
    const params = paramsMatch ? paramsMatch.map(param => param.substring(1)) : []; // Remove the ':' prefix
    const body = lines.slice(1, -1); // Ignore the first and last lines (POUR and FIN)
  
    if (!procedureName || body.length === 0 || (paramsMatch && params.length !== paramsMatch.length)) {
      throw new Error('Invalid procedure definition');
    }
  
    this.procedures[procedureName] = { params, body };
  }
  

  executeProcedure(name: string, ...args: string[]): string {
    const procedure = this.procedures[name];
    if (!procedure) {
      console.error(`Procedure ${name} is not defined`);
      return `Error: Procedure ${name} is not defined.`;
    }
  
    // Replace parameters in the body with actual arguments
    let executionResult = ''; // Initialize an empty string to hold the results
    procedure.body.forEach(commandTemplate => {
      const command = commandTemplate.replace(/:\w+/g, match => {
        const paramName = match.slice(1); // Remove the ':' prefix
        const paramIndex = procedure.params.indexOf(paramName);
        return args[paramIndex];
      });
  
      // Execute the command and append the result to executionResult
      executionResult += this.execute(command) + '\n';
    });
  
    return executionResult.trim(); // Return the results trimmed of any excess whitespace
  }
  
}
