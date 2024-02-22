import { Component, OnInit } from '@angular/core';
//import { ScriptService } from 'src/services/script.service';

@Component({
  selector: 'app-script-editor',
  templateUrl: './script-editor.component.html',
  styleUrls: ['./script-editor.component.css']
})
export class ScriptEditorComponent /*implements OnInit*/ {
  /*scriptNames: string[] = [];
  selectedScriptName: string = '';
  scriptContent: string = '';

  constructor(private scriptService: ScriptService) {}

  ngOnInit() {
    this.loadScriptNames();
  }

  loadScriptNames() {
    this.scriptService.getScriptNames().subscribe(names => {
      this.scriptNames = names;
    });
  }

  loadScript(name: string) {
    this.scriptService.getScriptContent(name).subscribe(content => {
      this.scriptContent = content;
      this.selectedScriptName = name;
    });
  }

  saveScript() {
    this.scriptService.saveScript(this.selectedScriptName, this.scriptContent).subscribe(response => {
      // Handle the response, e.g., show a notification
      console.log('Script saved successfully');
    });
  }*/

  // Additional methods for script management can be added here
}
