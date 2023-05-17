import React, { useState } from 'react';
import s from './Selection.module.scss';
import Header from '../../components/Header/Header';
import Pick from '../../components/Pick/Pick';
import { AiOutlineLeft } from 'react-icons/ai';
import { useFetch } from '../../hooks/useFetch';
import AromasItem from '../../components/AromasItem/AromasItem';
import { Link } from 'react-router-dom';

const Selection = () => {
    const [stage, setStage] = useState(1);

    const [forWho, setForWho] = useState('');
    const [season, setSeason] = useState('');
    const [purpose, setPurpose] = useState('');
    const [visibility, setVisibility] = useState('');
    const { data, error, loading } = useFetch(
        `http://localhost:3000/aromas/?for=${forWho}&season=${season}&=${purpose}&=${visibility}`
    );

    const handleChangeStage = () => {
        if (stage > 1) {
            setStage((prev) => prev - 1);
        }
    };

    const pick = () => {
        switch (stage) {
            case 1:
                return (
                    <Pick
                        setStage={setStage}
                        setState={setForWho}
                        data={['Для женщин', 'Для мужчин', 'Универсальный']}
                        title='Для кого аромат?'
                    />
                );

            case 2:
                return (
                    <Pick
                        setStage={setStage}
                        setState={setSeason}
                        data={['Весна / Лето', 'Осень / Зима']}
                        title='Сезон года'
                    />
                );

            case 3:
                return (
                    <Pick
                        setStage={setStage}
                        setState={setPurpose}
                        data={['Деловой', 'Выходной', 'Повседневный']}
                        title='Назначение аромата'
                    />
                );

            case 4:
                return (
                    <Pick
                        setStage={setStage}
                        setState={setVisibility}
                        data={['Заметный', 'Близкий к коже']}
                        title='Заметность аромата окружающим'
                    />
                );

            case 5:
                return (
                    <div className={s.items}>
                        <p className={s.notFound}>
                            {!data.length ? 'Нечего не найдено' : 'Ароматы по вашемо запросу'}
                        </p>

                        {data.map((item: any) => (
                            <Link to={`/aroma/${item.for}/${item.id}`} key={item.id}>
                                <AromasItem aroma={item} />
                            </Link>
                        ))}
                    </div>
                );

            default:
                'Error';
                break;
        }
    };

    return (
        <div className={s.container}>
            <Header />
            {stage < 5 && <h1 className={s.title}>Вопрос {stage}/4</h1>}

            {pick()}

            {stage > 1 && (
                <button onClick={handleChangeStage}>
                    <AiOutlineLeft className={s.iconArrow} />
                    Назад
                </button>
            )}
        </div>
    );
};

export default Selection;
