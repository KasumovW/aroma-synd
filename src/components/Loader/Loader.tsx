import s from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={s.loader}>
            <div className={s['lds-ripple']}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
