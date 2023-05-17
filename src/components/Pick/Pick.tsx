import s from './Pisck.module.scss';

type Props = {
    setStage: Function;
    setState: Function;
    data: any;
    title: string;
};

const Pick = ({ setState, data, title, setStage }: Props) => {
    const pick = (index: number) => {
        setState(index + 1);
        setStage((prev: number) => (prev !== 5 ? prev + 1 : prev));
    };

    return (
        <div className={s.pickItem}>
            <div>
                <h1>{title}</h1>

                <ul>
                    {data.map((item: string, index: number) => (
                        <li key={index} onClick={() => pick(index)}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Pick;
