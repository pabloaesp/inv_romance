import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [UserService]
})
export class AppComponent  {
  public title: string;
  public identity:any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ){
    this.title = 'Inventario Romance';
    
  }

  ngOnInit(){
    this.identity = JSON.parse(this._userService.getIdentity());
    // console.log(this.identity);
  }

  ngDoCheck(){
    this.identity = JSON.parse(this._userService.getIdentity());
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

}