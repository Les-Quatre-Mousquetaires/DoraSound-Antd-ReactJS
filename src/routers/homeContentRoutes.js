/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React from 'react';
import HomePage from "../pages/homePage";
import CategoryPage from "../pages/categoryPage";
import AlbumPage from "../pages/albumPage";
import UserPage from "../pages/userPage";
import RadioPage from "../pages/radioPage";
import UploadPage from '../pages/uploadPage';

import AdminPage  from '../pages/adminPage';

import ProfilePage from "../pages/profilePage";

const homeContentRoutes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage/>
    },{
        path: '/categories',
        exact: true,
        main: () => <CategoryPage/>
    },{
        path: '/albums',
        exact: true,
        main: () => <AlbumPage/>
    },{
        path: '/users/:id',
        exact: true,
        main: ({match}) => <UserPage match={match}/>
    },{
        path: '/radio',
        exact: true,
        main: () => <RadioPage/>
    },{
        path: '/admin',
        exact: true,
        main: () => <AdminPage/>
    },{
        path: '/profile',
        exact: true,
        main: () => <ProfilePage/>
    },{
        path: '/upload',
        exact: true,
        main: () => <UploadPage />
    }

];

export default homeContentRoutes;
