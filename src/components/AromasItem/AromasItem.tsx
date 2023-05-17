import { Link, useLocation } from 'react-router-dom';
import s from './AromasItem.module.scss';

type Props = {
    aroma: {
        id: number;
        for: number;
        title: string;
        price: number;
        image: string;
        number: number;
    };
};

const AromasItem = ({ aroma }: Props) => {
    const location = useLocation();
    const path = location.pathname.slice(1, location.pathname.length);

    return (
        <Link className={s.link} to={`/${path}/${aroma.id}`}>
            <div className={s.container}>
                <div className={s.title}>
                    <div className={s.number}>{aroma.number}</div>
                    <p>{aroma.title}</p>
                </div>
                <p className={s.price}>{aroma.price} ₽ мл</p>
            </div>
        </Link>
    );
};

export default AromasItem;
