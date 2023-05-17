import { useState } from 'react';
import s from './Admin.module.scss';

import cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header/Header';

const Admin = () => {
    const token = cookies.get('token') || null;
    const [userData, setUserData] = useState({ login: '', password: '' });

    const handleAuth = (e: any) => {
        e.preventDefault();

        if (userData.login === 'Zurab' && userData.password === 'password123') {
            cookies.set('token', 'adminZurab');
            window.location.reload();
        }

        console.log(userData.login, userData.password);
        return false;
    };

    const handleChangeUserData = (key: string, value: string) => {
        setUserData({ ...userData, [key]: value });
    };

    if (!token) {
        return (
            <div className={s.authPanel}>
                <h1>Админ понель</h1>
                <form className={s.form} onSubmit={handleAuth}>
                    <input
                        value={userData.login}
                        onChange={(e: any) => handleChangeUserData('login', e.target.value)}
                        type='text'
                    />
                    <input
                        type='password'
                        value={userData.password}
                        onChange={(e: any) => handleChangeUserData('password', e.target.value)}
                    />

                    <button>Войти</button>
                </form>
            </div>
        );
    }

    return (
        <>
            <Header />
            <nav className={s.navPanel}>
                <Link to='/admin/all-items'>
                    <button>Список всех ароматов</button>
                </Link>
                <Link to='/admin/add-item'>
                    <button>Добавить аромат</button>
                </Link>
                {/* <Link to='/admin/change-item'>
                <button>Изменить аромат</button>
            </Link> */}
            </nav>
        </>
    );
};

export default Admin;
