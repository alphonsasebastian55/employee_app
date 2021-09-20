import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {loginUser} from '../../store/reducers/auth';

import * as Yup from 'yup';

import * as AuthService from '../../services/auth';
import Button from '../../components/button/Button';


import Header from '../main/header/Header';
import Footer from '../main/footer/Footer';
import MenuSidebar from '../main/menu-sidebar/MenuSidebar';
import Table from '../../components/table/Table';
const Login = () => {
    const [menusidebarState, updateMenusidebarState] = useState({
        isMenuSidebarCollapsed: false
    });

    const toggleMenuSidebar = () => {
        updateMenusidebarState({
            isMenuSidebarCollapsed: !menusidebarState.isMenuSidebarCollapsed
        });
    };

    const history = useHistory();

    document.getElementById('root').classList = 'hold-transition login-page';

    return (
        <div className="wrapper">
            <Header toggleMenuSidebar={toggleMenuSidebar} />

            <MenuSidebar />

            <div className="content-wrapper">
            <Table></Table>
            </div>
        <Footer />
        <div
            id="sidebar-overlay"
            role="presentation"
            onClick={toggleMenuSidebar}
            onKeyDown={() => {}}
        />
        </div>
    );
};

export default Login;
