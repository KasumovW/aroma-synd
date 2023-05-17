import ReactDOM from 'react-dom/client';
import './index.scss';
import { router } from './routes/root.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(router);

