import s from './Aroma.module.scss';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../../components/Loader/Loader';

// type Props = {};

const Aroma = () => {
    const { id } = useParams();
    const { data = [], loading } = useFetch(`http://localhost:3000/aromas/${id}`);

    if (loading) {
        <Loader />;
    }

    return (
        <div className={s.container}>
            <Header />
            <h1 className={s.number}>{data.number}</h1>
            <p className={s.name}>Название</p>
            <p className={s.title}>{data.title}</p>
            <p className={s.name}>{data.price} ₽ / мл</p>
            <div className={s.line} />

            {data.notes &&
                data?.notes.map((aroma) => (
                    <>
                        <p className={s.notes_title}>{aroma.title}:</p>
                        <div className={s.notes}>
                            {aroma.note.map((note) => (
                                <div className={s.note}>
                                    <img src={note.img} alt='Картинка не прогрузилась' />
                                    <span>{note.title}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ))}
        </div>
    );
};

export default Aroma;
