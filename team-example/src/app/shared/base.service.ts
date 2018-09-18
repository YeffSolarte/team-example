import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { GLOBAL} from "./global";
import {MatDialog} from '@angular/material';
import {MyDialogComponent} from "./my-dialog/my-dialog.component";

export abstract class BaseService<TEntity>{
  protected _http : HttpClient;
  protected _path : string;
  protected _dialog : MatDialog;
  constructor(http: HttpClient, path : string,dialog: MatDialog){
    this._http = http;
    this._path = path;
    this._dialog = dialog;
  }

  create(entity:TEntity): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post<TEntity>(
      GLOBAL.url + this._path,
      entity,
      {headers: headers});
  }

  get(id = null): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.get(
      `${GLOBAL.url + this._path}` + (id ? `/${id}` : ''),
      {headers: headers});
  }

  update(entity:TEntity, identify : string): Observable<any> {
    console.log("update");
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.put<TEntity>(
      GLOBAL.url + this._path + '/' + entity[identify],
      entity,
      {headers: headers});
  }

  delete(id : string | number): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.delete(`${GLOBAL.url + this._path}/${id}`,{headers: headers});
  }

  openDialog(text:string): void {
    const dialogRef = this._dialog.open(MyDialogComponent, {
      width: '250px',
      data: {text: text}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //
    // });
  }

}
