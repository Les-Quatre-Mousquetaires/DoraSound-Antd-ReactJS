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
        path: '/users',
        exact: true,
        main: () => <UserPage/>
    },{
        path: '/radio',
        exact: true,
        main: () => <RadioPage/>
    },
];

export default homeContentRoutes;
