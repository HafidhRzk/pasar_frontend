import Login from '../features/user/Login'
import { Helmet } from 'react-helmet';

function ExternalPage() {
    const title = 'Login';
    return (
        <div className="">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Login />
        </div>
    )
}

export default ExternalPage