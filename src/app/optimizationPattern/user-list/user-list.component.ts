import { UsersService } from './../users.service';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { User } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  @Input() usersCluster: string = '';
  @Input() users: User[] = [];

  constructor(private userService: UsersService) {}

  userFullName: string = '';
  addUser() {
    this.userService.addUser(this.users, this.userFullName);
    this.userFullName = '';
  }
}
