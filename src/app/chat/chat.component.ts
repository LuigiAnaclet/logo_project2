import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ClassService } from '../services/class.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  @Input() classId: string | null = null;
  userRole: string = '';
  isTeacher: boolean = false;

  constructor(private chatService: ChatService,
    private classService: ClassService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.loadMessages();
    if (this.classId) {
      this.determineUserRole(this.classId);
    }
  }

  loadMessages(): void {
    if (this.classId){
    this.chatService.getMessages(this.classId).subscribe(
      (data: any[]) => {
        //console.log(data);
        this.messages = data;
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );}
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      if (this.classId){
      this.chatService.sendMessage(this.classId,this.newMessage).subscribe(
        (message) => {
          this.messages.push(message);
          this.newMessage = ''; 
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );}
    }
  }

  deleteMessage(messageId: number): void {
    this.chatService.deleteMessage(messageId).subscribe(
      () => {
        this.messages = this.messages.filter(m => m.MessageId !== messageId);
      },
      (error) => {
        console.error('Error deleting message:', error);
      }
    );
  }

  determineUserRole(classId: string): void {
    const token = this.authService.getToken();
    if (token) {
      this.classService.getClassRole(classId, token).subscribe(
        (response: any) => {
          this.userRole = response.role;
          this.isTeacher = this.userRole === 'teacher' || this.userRole === 'co-teacher';
        },
        (error) => {
          console.error('Error fetching user role for class:', error);
        }
      );
    }
  }
}
