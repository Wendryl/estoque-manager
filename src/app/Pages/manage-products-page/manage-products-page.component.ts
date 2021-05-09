import { Component, OnInit } from '@angular/core';
import {IProduct} from 'src/app/Models/product';
import {ProductService} from 'src/app/Services/product.service';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-products-page',
  templateUrl: './manage-products-page.component.html',
  styleUrls: ['./manage-products-page.component.css']
})
export class ManageProductsComponent implements OnInit {

  products: Array<IProduct> = [];
  toast = Swal.default.mixin({
    toast: true,
    position: 'top-right'
  });

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {

    this._productService.list()
      .subscribe(
        data => this.products = data
      )
  }

  async deleteProduct(id: number, description: string) {
    const confirm = await Swal.default.fire({
      title: 'Aviso!',
      html: `Tem certeza que deseja excluir o produto<br> "${description}" ?<br> Esta ação não pode ser revertida!`,
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
      this._productService.delete(id)
        .subscribe(
          data => {
            if(data == 1) {
              this.toast.fire('Sucesso', 'Produto excluído com sucesso', 'success');
              this._productService.list()
                .subscribe(
                  data => this.products = data
                )
            } else {
              this.toast.fire('Erro', 'Houve uma falha ao excluir o produto', 'error');
            }
          }
        )
    }

  }

}
