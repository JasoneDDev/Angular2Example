import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import * as firebase from 'firebase';
@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser:string;
    authUser: any;

    constructor( private router:Router ) {

firebase.initializeApp({
    apiKey: "AIzaSyDDTtBTAbqcJyO5jhuliiMNiNpLaL4wMQk",
    authDomain: "testhub-1a13b.firebaseapp.com",
    databaseURL: "https://testhub-1a13b.firebaseio.com",
    projectId: "testhub-1a13b",
    storageBucket: "testhub-1a13b.appspot.com",
    messagingSenderId: "153169727029"
  })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url:string):boolean {
        if(this.userLoggedIn) {return true;}

        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email:string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error){
            alert('${error.message} Please Try Again!');
        });
    }

    verifyUser(){
        this.authUser = firebase.auth().currentUser;

        if(this.authUser){
            let msg:string = `Welcome ${this.authUser.email}`;
            alert(msg);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }

    login(loginEmail: string, loginPassword: string){
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(error){
                alert(`${error.message} Unable to login, Try again!`);
            });
    }

    logout(){
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function(){
            alert('Logged Out!');
        }, function(error){
            alert(`${error.message} Unable to logout. Try again!`);
        });

    }
}