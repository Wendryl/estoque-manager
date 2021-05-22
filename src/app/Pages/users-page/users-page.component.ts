import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/Services/user.service';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  loading = false;
  users: Array<IUser> = [];
  toast = Swal.default.mixin({
    toast: true,
    position: 'top-right'
  });
  profiles = ['Administrador', 'Funcionário'];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {

    this.loading = true;
    this._userService.list()
      .subscribe(
        data => {
          this.users = data;
          this.loading = false;
        }
      )
  }

  async deleteUser(name: string, id?: number) {
    const confirm = await Swal.default.fire({
      title: 'Aviso!',
      html: `Tem certeza que deseja excluir o usuário<br> "${name}" ?<br> Esta ação não pode ser revertida!`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      cancelButtonColor: '#dc3545',
      confirmButtonColor: '#157347',
      customClass: {
        cancelButton: 'order-1',
        confirmButton: 'order-2'
      }
    });

    if(confirm.isConfirmed) {
      this._userService.delete(Number(id))
        .subscribe(
          data => {
            if(data == 1) {
              this.toast.fire('Sucesso', 'Usuário excluído com sucesso', 'success');
              this._userService.list()
                .subscribe(
                  data => this.users = data
                )
            } else {
              this.toast.fire('Erro', 'Houve uma falha ao excluir o usuário', 'error');
            }
          }
        )
    }

  }

}
