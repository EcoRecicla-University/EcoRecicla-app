import { Component, OnInit } from "@angular/core";

@Component ({
    selector: 'app-login-component',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    ngOnInit(): void {
        console.log('teste')
    }
}