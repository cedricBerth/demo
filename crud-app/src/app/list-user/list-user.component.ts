import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { User } from '../model/user/user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    /*if (!window.localStorage.getItem('token')){
      this.router.navigate(['login']);
    }*/
    this.apiService.getUsers()
    .subscribe(users => {
      this.users = users;
    });

  }

  deleteUser(user: User): void{
    this.apiService.deleteUser(user.id)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      });
  }

  editUser(user: User): void{
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  }

  addUser(): void{
    this.router.navigate(['add-user']); 
  }

}
