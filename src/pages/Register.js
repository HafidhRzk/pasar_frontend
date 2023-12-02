import Register from '../features/user/Register'
import { Helmet } from 'react-helmet';

function ExternalPage() {

    const title = 'Register';
    return (
        <div className="">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Register />
        </div>
    )
}

export default ExternalPage