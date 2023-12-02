import { Link } from 'react-router-dom'
import Title from '../components/Typography/Title'
import { Helmet } from 'react-helmet';


function LandingPage() {
    const title = 'Landing Page';
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="min-h-screen bg-base-200 flex items-center">
                <div className="card mx-auto w-full max-w-4xl  shadow-xl">
                    <div className="py-12 p-10 h-screen overflow-hidden  bg-base-100 rounded-xl" >
                        <div className="w-full h-full text-center justify-center items-center flex">
                            <div>
                                <Title className="text-center">Welcome to <span className="text-primary">Pasar App</span></Title>
                                <div className="divider"></div>
                                <div className="w-full flex justify-center">
                                    <div className='p-4'>
                                        <Link to="/login" className="btn btn-primary">Login</Link>
                                    </div>
                                    <div className='p-4'>
                                        <Link to="/register" className="btn btn-primary">Register</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage