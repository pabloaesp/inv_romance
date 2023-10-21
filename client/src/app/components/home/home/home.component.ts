import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from "src/models/user";
import { UserService } from "src/services/user.services";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    public title: string;
    // public user: User;
    public status: string;
    public identity: any;
    public token: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService

    ) {
        this.title = 'Home Component'
        this.status = 'null';
    }
    

    ngOnInit() {
        console.log('Componente de Home cargado');
        this.identity = JSON.parse(this._userService.getIdentity());
    }
}