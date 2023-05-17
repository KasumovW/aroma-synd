import ChangePost from '../ChangePost/ChangePost';
import AllPost from '../AllPosts/AllPost';

type Props = {
    type: 'add' | 'change' | 'get';
};

const AdminNewPost = ({ type }: Props) => {
    if (type === 'add') return <ChangePost type='add' />;
    // if (type === 'change') return <ChangePost type='change' />;
    if (type === 'get') return <AllPost />;
};

export default AdminNewPost;
