import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from  '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './adminComponent/admin.component';
import { AdminMenuComponent } from './adminMenu/admin-menu.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { UserService } from './adminShared/user.service';

import { BlogAdminService } from './adminShared/blog-admin.service';
import {BlogAdminComponent} from './blogAdmin/blogAdmin.Component';
import {BlogAddComponent} from './blogAdd/blogAdd.component';


const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {path: 'blog-admin', component: BlogAdminComponent, canActivate: [UserService] },
            {path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
            { path: '', component: AdminMenuComponent, canActivate: [UserService] }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AdminComponent,
        AdminMenuComponent,
        LoginComponent,
        SignupComponent,
        BlogAdminComponent,
        BlogAddComponent,
    ],
    providers: [
        UserService,
        BlogAdminService
    ]
})
export class AdminModule {}