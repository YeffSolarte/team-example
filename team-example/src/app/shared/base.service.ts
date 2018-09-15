import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { GLOBAL} from "./global";

export abstract class BaseService<TEntity>{
  protected _http : HttpClient;
  protected path : string;
  constructor(_http: HttpClient, path : string){
    this._http = _http;
    this.path = path;
  }

  create(entity:TEntity): Observable<TEntity> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post<TEntity>(
      GLOBAL.url + this.path,
      entity,
      {headers: headers});
  }

  get(id = null): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.get(
      `${GLOBAL.url + this.path}` + (id ? `/${id}` : ''),
      {headers: headers});
  }

  update(entity:TEntity): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.put<TEntity>(
      GLOBAL.url + this.path,
      entity,
      {headers: headers});
  }

  delete(id : string | number): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.get(`${GLOBAL.url + this.path}/${id}`,{headers: headers});
  }

}
