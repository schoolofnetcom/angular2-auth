import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user = {
        email: '',
        password: ''
    };
    redirectAfterLogin = ['/products/list'];

    constructor(private router: Router, private auth: AuthService) {}

    ngOnInit() {
    }

    login() {
        this.auth.login(this.user).then(response => {
            this.router.navigate(this.redirectAfterLogin)
        });
    }

}
