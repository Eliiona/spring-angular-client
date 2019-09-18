import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../model/item';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

    private itemsUrl = 'http://localhost:8081/items';
    readonly httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };


  constructor( private http: HttpClient) {
   }

   public findAll(refresh: boolean): Observable<Item[]> {
        let refreshUrl = refresh ? (this.itemsUrl + "/refresh"):this.itemsUrl;
        return this.http.get<Item[]>(refreshUrl);
   }

   public save(item: Item){
        return this.http.post<Item>(this.itemsUrl, item);
   }

   public crossOut(item: Item){
        var updateUrl = this.itemsUrl + "/" + item.id;
        return this.http.put<Item>(updateUrl, item, this.httpOptions);
   }

   public delete(item: Item){
        var deleteUrl = this.itemsUrl + "/" + item.id;
        return this.http.delete<Item>(deleteUrl);
   }

   public deleteAll(){

        return this.http.delete(this.itemsUrl);
   }
}
