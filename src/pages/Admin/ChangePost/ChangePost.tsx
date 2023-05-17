import { useState } from 'react';
import s from './ChangePost.module.scss';
import Header from '../../../components/Header/Header';

type Props = {
    type: 'add' | 'change';
};

const ChangePost = ({ type }: Props) => {
    const [data, setData] = useState({
        for: null,
        number: null,
        title: null,
        price: null,
        accords: [],
        notes: [],
        image: null,
    });

    const onSubmit = (e: any) => {
        fetch('http://localhost:3000/aromas', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) =>
            res.status === 201 ? alert('Аромат успешно добавлен') : alert('Ошибка аромат не добавлен')
        );

        e.preventDefault();
        return false;
    };

    const handleChange = (key: string, value: any) => {
        setData({ ...data, [key]: value });
    };

    const [accord, setAccord] = useState('');
    const addAccords = () => {
        //@ts-ignore
        setData({ ...data, accords: [...data.accords, accord] });
        setAccord('');
    };

    const [notesTitle, setNotesTitle] = useState('');
    const [note, setNote] = useState<{ title: string; img: string }>({ title: '', img: '' });
    const [array, setArray] = useState<any>([]);

    const changeNoteData = (key: string, value: string) => {
        //@ts-ignore
        setNote({ ...note, [key]: value });
    };

    const addNote = () => {
        setArray([...array, note]);
        setNote({ title: '', img: '' });
    };

    const deleteNote = (title: string) => {
        setArray(array.filter((item: any) => item.title !== title));
    };

    const addNoteType = () => {
        setData({
            ...data,
            //@ts-ignore
            notes: [...data.notes, { title: notesTitle, note: [...array] }],
        });
        setNotesTitle('');
        setArray([]);
    };

    // console.log(data);

    return (
        <>
            <Header />

            <div className={s.container}>
                <h1>{type === 'add' ? 'Добавление нового аромата' : 'Изменение аромата'}</h1>

                <form onSubmit={onSubmit}>
                    <div className={s.main}>
                        <h3>Основные критерии</h3>
                        <input
                            onChange={(e) => handleChange('title', e.target.value)}
                            value={data.title || ''}
                            type='text'
                            placeholder='Название'
                        />
                        <input
                            onChange={(e) => handleChange('number', e.target.value)}
                            value={data.number || ''}
                            type='number'
                            placeholder='Номер'
                        />
                        <input
                            onChange={(e) => handleChange('price', e.target.value)}
                            value={data.price || ''}
                            type='number'
                            placeholder='Цена'
                        />
                        <input
                            onChange={(e) => handleChange('image', e.target.value)}
                            value={data.image || ''}
                            type='text'
                            placeholder='Ссылка на картинку'
                        />

                        <select onChange={(e) => handleChange('for', e.target.value)}>
                            <option value=''>--------</option>
                            <option value='1'>Женские</option>
                            <option value='2'>Мужскиие</option>
                            <option value='3'>Универсальные</option>
                        </select>
                    </div>
                    <div className={s.akkord}>
                        <h3>Аккорды</h3>
                        <div>
                            <input
                                onChange={(e) => setAccord(e.target.value)}
                                value={accord}
                                type='text'
                                placeholder='Аккорды'
                            />
                            <button disabled={!accord} onClick={addAccords} type='button'>
                                Добавить аккорд
                            </button>
                        </div>
                        <span>{data.accords.map((accord) => `${accord} `)}</span>
                    </div>
                    <div className={s.notes}>
                        <h3>Ноты</h3>
                        <input
                            value={note?.title}
                            onChange={(e) => changeNoteData('title', e.target.value)}
                            type='text'
                            placeholder='Название ноты'
                        />
                        <input
                            value={note?.img}
                            onChange={(e) => changeNoteData('img', e.target.value)}
                            type='text'
                            placeholder='Ссылка на картинку'
                        />
                        <button disabled={!note.title || !note.img} onClick={addNote} type='button'>
                            Добавить ноту и фото
                        </button>
                        {array.length > 0 && (
                            <div className={s.noteArray}>
                                {array.map((note: any) => (
                                    <div>
                                        <p onClick={() => deleteNote(note.title)}>❌</p>
                                        <img src={note.img} alt='Картинка не прогрузилась' />
                                        <span>{note.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className={s.noteType}>
                            <input
                                value={notesTitle}
                                onChange={(e) => setNotesTitle(e.target.value)}
                                type='text'
                                placeholder='Тип ноты'
                            />
                            <button disabled={!notesTitle} onClick={addNoteType} type='button'>
                                Добавить тип нот
                            </button>
                        </div>
                    </div>

                    {data.notes.length > 0 &&
                        data.notes.map((elem: any) => (
                            <div className={s.viewNote}>
                                <h3>{elem.title}</h3>
                                <div className={s.noteArray}>
                                    {elem.note.map((note: any) => (
                                        <div>
                                            <img src={note.img} alt='Картинка не прогрузилась' />
                                            <span>{note.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    <button type='submit'>Готово</button>
                </form>
            </div>
        </>
    );
};

export default ChangePost;
