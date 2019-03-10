import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://local.aterrochat:8081/';
  private _headers;

  constructor(private _http: HttpClient) { }

  createUser(user: User) {
    this._headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return new Promise((resolve, reject) => {
      this._http.post(this.apiUrl + 'user', JSON.stringify(user), this._headers)
        .subscribe((result: any) => {
          console.log(result);
          resolve(result);
        }, (err) => {
          if (err.status == 500) {
            // this._alertCtrl.create({
            //   title: 'Falha na inscrição',
            //   buttons: [{ text: 'Estou ciente!'}],
            //   subTitle: 'Verifique os dados da inscrição!'
            // }).present();
          } else {
            reject(err);
          }
        });
    });
  }

}
