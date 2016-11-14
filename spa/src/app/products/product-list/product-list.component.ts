import {Component, OnInit} from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {DefaultRequestOptionsService} from "../../services/default-request-options.service";
import {JwtTokenService} from "../../services/jwt-token.service";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: Array<Object> = [];

    constructor(private http: Http,
                private requestOptions: DefaultRequestOptionsService,
                private jwtToken: JwtTokenService) {

    }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {

        this.http
            .get('http://localhost:8000/api/products', this.requestOptions.merge(new RequestOptions()))
            .toPromise()
            .then(response=> this.products = response.json())
            .catch(responseError => {
                if (responseError.status === 401) {
                    this.http.post('http://localhost:8000/api/refresh_token', {}, this.requestOptions.merge(new RequestOptions()))
                        .toPromise()
                        .then(response => {
                            this.jwtToken.token = response.json().token;
                            this.http
                                .get('http://localhost:8000/api/products', this.requestOptions.merge(new RequestOptions()))
                                .toPromise()
                                .then(response=> this.products = response.json())
                        })
                }
            });
    }


}
