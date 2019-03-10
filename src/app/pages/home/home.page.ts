import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  private user: User;
  private loading: LoadingController;
  private emailError: String;

  constructor(
    private _storage: Storage,
    private _loadingController: LoadingController,
    private _userService: UserService
  ) {
    this.user = new User();
    this.emailError = '';

  }

  loginUser(): void {
    console.log(this.user);

  }

  changeBoxUser(): void {
    let loginUser, registerUser;
    loginUser = document.getElementById('box-login');
    registerUser = document.getElementById('box-register');

    if (loginUser.classList.contains('el-hide')) {
      loginUser.classList.remove('el-hide');
      registerUser.classList.add('el-hide')
    } else {
      loginUser.classList.add('el-hide');
      registerUser.classList.remove('el-hide')
    }
  }

  registerUser(): void {
    this.presentLoading();
    this._userService.createUser(this.user).then((data: any) => {
      this.loading.dismiss();
      this._storage.set('user', {
        id: data.result._id, name: data.result.name,
        lastname: data.result.lastname, email: data.result.email, apiToken: data.result.api_token
      });
      this._storage.get('user').then((val) => {
        console.log('Your age is', val);
      });
    }).catch((err) => {
      this.emailError = err.error.email[0];
      this.loading.dismiss();
    });
  }

  async presentLoading() {
    this.loading = await this._loadingController.create({
      message: 'Aguarde',
    });
    return await this.loading.present();
  }

  // async presentLoadingWithOptions() {
  //   const loading = await this._loadingController.create({
  //     spinner: null,
  //     duration: 5000,
  //     message: 'Please wait...',
  //     translucent: true,
  //     cssClass: 'custom-class custom-loading'
  //   });
  //   return await loading.present();
  // }
}

