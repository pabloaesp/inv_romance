import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { UserService } from "src/app/services/user.services";
// import { JsonPipe } from "@angular/common";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    // providers: [UserService]
})
export class LoginComponent implements OnInit{
    public title: string;
    // public user: User;
    public status: string;
    public identity: any;
    public token: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        // private _userService: UserService

    ){
        this.title = 'Identificate'
        this.status = 'null';
        // this.user = new User("","","","","","ROLE_USER","");
    }


    ngOnInit() {
        console.log('Componente de login cargado');
        
        /*this.token = this._userService.gettoken();
        if(this.token){
            this._router.navigate(['/home']);
        }*/
    }


    /*onSubmit(){
        // Loguear al usuario y conseguir sus datos
        this._userService.login(this.user).subscribe(
            response => {
                this.identity = response.user;

                console.log(this.identity);

                if(!this.identity || !this.identity._id){
                    this.status = 'error';

                }else{
                    // Persistir datos del usuario
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    // Conseguir token
                    this.getToken();

                    this._router.navigate(['/home']);
                }

            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage.error.message);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }*/


    /*getToken(){
        this._userService.login(this.user, 'true').subscribe(
            response => {
                this.token = response.token;
                console.log(this.token);

                if(this.token.length <= 0){
                    this.status = 'error';
                    
                }else{
                    // Persistir token 
                    localStorage.setItem('token', this.token);
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }*/



}