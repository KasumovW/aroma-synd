import { useNavigate } from 'react-router-dom';
import s from './Header.module.scss';

import { AiOutlineLeft } from 'react-icons/ai';
import logo from '../../assets/logo.png';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={s.header}>
            <AiOutlineLeft className={s.iconArrow} onClick={() => navigate(-1)} />
            <div className={s.logo}>
                <img onClick={() => navigate('/')} src={logo} alt='Иконка не прогрузилась' />
            </div>
        </header>
    );
};

export default Header;
