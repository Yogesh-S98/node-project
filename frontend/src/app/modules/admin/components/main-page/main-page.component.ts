import { Component, OnInit } from '@angular/core';
import { apis } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  userForm: FormGroup;
  list:any = [];
  deleteModal: boolean = false;
  label = 'Create User';
  roles = [
    { name: 'Admin', value: 'admin' },
    { name: 'User', value: 'user' }
  ]
  constructor(
    private deleteDialog: ConfirmationService,
    private user: apis,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      id: '',
      name: '',
      email: '',
      password: '',
      role: ''
    })
  }
  selectUser(user: any) {
    this.label = 'Update User';
    const selectRole = this.roles.find((x) => x.value === user.role)
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      role: selectRole
    });
  }
  cancel() {
    this.userForm.reset();
    this.label = 'Create User';
  }
  deleteUser(data: any) {
    if (data) {
      this.deleteDialog.confirm({
        message: `Are you sure to delete user? ${data.name}`,
        header: 'Delete User',
        icon: 'pi pi-user',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        accept: () => {
          this.user.deleteUser(data.id).subscribe((res) => {
            console.log('ada', res);
            this.reloadPage();
          })
        },
        reject: () => {

        }
      })
    }
    console.log('delete', data);
  }
  reloadPage() {
    this.user.list().subscribe((res: any) => {
      this.list = res.data.users;
      
      this.label = 'Create User';
    });
  }
  submitForm() {
    const {
      id,
      name,
      email,
      password,
      role
    } = this.userForm.value;
    const payload = {
      id: id ? id : '',
      name: name,
      email: email,
      password: password,
      role: role.value
    };
    if (payload.id) {
      this.user.updateUser(payload).subscribe((res) => {
        if (res) {
          this.userForm.reset();
          this.reloadPage();
        }
      })
    } else {
      this.user.createUser(payload).subscribe((res) => {
        if (res) {
          this.userForm.reset();
          this.reloadPage();
        }
      });
    }
  }
  ngOnInit(): void {
      this.reloadPage();
  }
}
