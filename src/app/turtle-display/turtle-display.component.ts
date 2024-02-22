import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TurtleCommandsService, CommandAction } from 'src/app/services/turtle-commands.service';
import { LogoInterpreterService } from '../services/logo-interpreter.service';

@Component({
  selector: 'app-turtle-display',
  templateUrl: './turtle-display.component.html',
  styleUrls: ['./turtle-display.component.css']
})
export class TurtleDisplayComponent{
  @Input() pathData: string = '';
  @Input() showTurtle: boolean = true;
  isPenDown = true;

  turtlePosition = { x: 200, y: 200 };
  turtleAngle: number = 0; 
  pathStrokeColor: string = 'black';
  pathFillColor: string = 'white';
  

  constructor(private turtleService: TurtleCommandsService,private logoInterpreterService: LogoInterpreterService) {
    this.turtleService.commands$.subscribe(command => this.processCommand(command));
    this.pathData = `M ${this.turtlePosition.x} ${this.turtlePosition.y}`;
  }

  private processCommand(command: CommandAction) {
    const { action, params } = command;
    this.executeSingleCommand(action, params as number[]);
  }
  

  private executeSingleCommand(action: string, params: number[])  {
    switch (action.toUpperCase()) {
      case 'AV':
        this.moveTurtle(+params[0]);
        break;
      case 'RE':
        this.moveTurtle(-params[0]);
        break;
      case 'TD':
        this.turnTurtle(params[0]);
        break;
      case 'TG':
        this.turnTurtle(-params[0]);
        break;
        case 'LC':
          this.isPenDown = false;
          break;
        case 'BC':
          this.isPenDown = true;
          this.pathData += ` M ${this.turtlePosition.x} ${this.turtlePosition.y}`;
          break;
      case 'CT':
        this.showTurtle = false;
        break;
      case 'MT':
        this.showTurtle = true;
        break;
      case 'VE':
      case 'NETTOIE':
        this.clearScreen();
        break;
      case 'ORIGINE':
        this.resetTurtle();
        break;
        case 'FCC':
          this.pathStrokeColor = `rgb(${params.join(',')})`;
          break;
        case 'FCB':
          this.pathFillColor = `rgb(${params.join(',')})`;
          break;
        break;
      case 'FCAP':
        this.turtleAngle = +params[0];
        break;
      case 'FPOS':
        this.setTurtlePosition(+params[0], +params[1]);
        break;
        case 'CAP':
          break;
        
          case 'POSITION':
            case 'POS':
              break;
      default:
        console.warn(`Unknown command: ${action}`);
        break;
    }
  }

  getTrianglePoints() {
    if (isNaN(this.turtleAngle)) {
      console.error('turtleAngle is NaN, cannot calculate triangle points');
      return '';
    }
    const size = 10; 
    const height = size * (Math.sqrt(3)/2); 

    const centerX = this.turtlePosition.x;
    const centerY = this.turtlePosition.y;

    const points = [
      `${centerX},${centerY - size / 2}`, 
      `${centerX - height / 2},${centerY + size / 4}`, 
      `${centerX + height / 2},${centerY + size / 4}` 
    ].join(' ');

    return points;
  }

  private moveTurtle(distance: number) {
    if (isNaN(distance)) {
      console.error('Invalid distance:', distance);
      return;
    }
    const angleRad = (this.turtleAngle * Math.PI) / 180;
    const newX = this.turtlePosition.x + distance * Math.cos(angleRad);
    const newY = this.turtlePosition.y - distance * Math.sin(angleRad);
  
    if (this.isPenDown) {
      // Only draw if the pen is down
      this.pathData += ` L ${newX} ${newY}`;
    } else {
      // Move without drawing
      this.pathData += ` M ${newX} ${newY}`;
    }
    this.turtlePosition.x = newX;
    this.turtlePosition.y = newY;
  }

  private turnTurtle(angle: any) {
    const angleValue = parseFloat(angle);
    if (!isNaN(angleValue)) {
      this.turtleAngle = (this.turtleAngle + angleValue) % 360;
    } else {
      console.error('Invalid angle provided:', angle);
    }
  }

  private clearScreen() {
    this.pathData = '';
  }

  private resetTurtle() {
    this.turtlePosition = { x: 200, y: 200 };
    this.turtleAngle = 0;
    this.pathData = `M ${this.turtlePosition.x} ${this.turtlePosition.y}`;
  }

  private setTurtlePosition(x: number, y: number) {
    if (isNaN(x) || isNaN(y)) {
      console.error('Invalid turtle position:', x, y);
      return;
    }
    this.turtlePosition = { x, y };
    this.pathData += ` M ${x} ${y}`;
  }
}
