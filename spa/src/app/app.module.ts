import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Ng2BootstrapModule} from 'ng2-bootstrap';

import routing from './app.routing';
import {AppComponent} from './app.component';
import { LoginComponent } from './login/login.component';
import {LocalStorageService} from "./services/local-storage.service";
import {JwtTokenService} from "./services/jwt-token.service";
import { ProductListComponent } from './products/product-list/product-list.component';
import {AuthService} from "./services/auth.service";
import {AuthGuardRouterService} from "./services/auth-guard-router.service";
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import {DefaultRequestOptionsService} from "./services/default-request-options.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ProductListComponent,
        MenuComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2BootstrapModule,
        routing
    ],
    providers: [
        LocalStorageService,
        JwtTokenService,
        AuthService,
        AuthGuardRouterService,
        DefaultRequestOptionsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
