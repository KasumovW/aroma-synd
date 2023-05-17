import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Main from '../pages/Main/Main';
import Aromas from '../pages/Aromas/Aromas';
import Aroma from '../pages/Aroma/Aroma';
import Admin from '../pages/Admin/Admin/Admin';
import AdminNewPost from '../pages/Admin/AdminEditPost/AdminEditPost';
import AllPost from '../pages/Admin/AllPosts/AllPost';

import cookies from 'js-cookie';
import Selection from '../pages/Selection/Selection';

const token = cookies.get('token') || null;
const privateRoute = token === 'adminZurab' && (
    <>
        <Route path='/admin/add-item' element={<AdminNewPost type='add' />} />
        {/* <Route path='/admin/change-item' element={<AdminNewPost type='change' />} /> */}
        <Route path='/admin/all-items' element={<AllPost type='get' />} />
    </>
);

export const router = (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/aroma/women' element={<Aromas aromas={{ id: 1, title: 'Женские' }} />} />
            <Route path='/aroma/man' element={<Aromas aromas={{ id: 2, title: 'Мужские' }} />} />
            <Route path='/aroma/uneversal' element={<Aromas aromas={{ id: 3, title: 'Уневирсальные' }} />} />
            <Route path='/aroma/selection' element={<Selection />} />
            <Route path='/aroma/:for/:id' element={<Aroma />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='*' element={<NotFound />} />

            <Route path='/admin' element={<Admin />} />

            {privateRoute}
        </Routes>
    </BrowserRouter>
);
