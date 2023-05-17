import s from './Aromas.module.scss';
import { useFetch } from '../../hooks/useFetch';
import AromasItem from '../../components/AromasItem/AromasItem';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';

type Props = {
    aromas: { id: 1 | 2 | 3; title: string };
};

const Aromas = ({ aromas }: Props) => {
    const path = window.location.href;
    const { data, loading, error } = useFetch(`http://localhost:3000/aromas?for=${aromas.id}`);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    return (
        <div className={s.container}>
            <Header />
            <h1>{aromas.title} ароматы</h1>
            <div className={s.items}>
                {data.map((item) => (
                    <AromasItem aroma={item} />
                ))}
            </div>
        </div>
    );
};

export default Aromas;
