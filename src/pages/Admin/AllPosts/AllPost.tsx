import { useFetch } from '../../../hooks/useFetch';
import Header from '../../../components/Header/Header';
import AromasItem from '../../../components/AromasItem/AromasItem';
import Loader from '../../../components/Loader/Loader';

import s from './AllPosts.module.scss';
import { useEffect, useState } from 'react';

const AllPost = () => {
    const { data, loading, error } = useFetch(
        'https://my-json-server.typicode.com/KasumovW/aroma-synd/aromas'
    );
    const [localData, setLocalData] = useState([]);

    useEffect(() => {
        setLocalData(data);
    }, [loading]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    const deleteItem = (id: number) => {
        fetch(`http://localhost:3000/aromas/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((res) => console.log(res));

        setLocalData(localData.filter((item: any) => item.id !== id));
    };

    return (
        <div className={s.container}>
            <Header />
            <h1>Все ароматы</h1>
            <div className={s.items}>
                {localData.map((item: any) => (
                    <div key={item.id} onClick={() => deleteItem(item.id)}>
                        <span className={s.exit}>❌</span>
                        <AromasItem aroma={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPost;
