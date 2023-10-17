import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs-compat/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
    public url: string;
    public identity: any;
    public token: any;
    public stats: any;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
        // this.identity = null;
    }

    register(user: User): Observable<any>{
        let params = JSON.stringify(user); 
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'register', params, {headers: headers});
    }


    login(user: any, gettoken = ''): Observable<any>{
        if(gettoken != ''){
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params, {headers: headers});
    }


    getIdentity(){
        let identity = localStorage.getItem('identity');
    
        if(identity != undefined){
          this.identity = identity;
        }else{
          this.identity = null;
        }
    
        return this.identity;
      }

      
    gettoken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    /*getStats(){
        let stats = localStorage.getItem('stats');

        if(stats != undefined){
            this.stats = stats;
        }else{
            this.stats = null;
        }

        return this.stats;
    }

    getCounters(userId = null):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization',this.gettoken());

        if(userId != null){
            return this._http.get(this.url+'counters/'+userId, {headers: headers});
        }else{
            return this._http.get(this.url+'counters/', {headers: headers});
        }

    }*/

}