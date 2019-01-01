import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { User } from '../model/user/user.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User;
  userForm: FormGroup;
  ages: number[] = []; 
  dataSent: boolean = false; 

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.user = new User();
    this.InitForm();
    for (var i = 1; i <= 100; i++){
      this.ages.push(i); 
    }
    console.log(this.userForm.valid);
  }

  onSubmit(){
    if (this.userForm.valid){
      this.apiService.createUser(this.user)
        .subscribe(data => {
          this.user = data;
          this.dataSent = true; 
        });
    } else {
      console.log("Erreur d'envoi");
    }
  }

  InitForm(){
    this.userForm = new FormGroup({
      firstname: new FormControl(['', Validators.required]), 
      username: new FormControl(['', Validators.required]), 
      age: new FormControl(['', Validators.required]), 
      salary: new FormControl(['', Validators.required])
    });
  }

  checkUsername(){
    this.apiService.checkUserByEmail(this.user.username)
      .subscribe(data => {
       console.log(data)
      });
  }

}
