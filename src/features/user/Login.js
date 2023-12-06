import { useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import axios from 'axios';

function Login() {
    const INITIAL_LOGIN_OBJ = {
        password: "",
        email: ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = async (e) => {
        try {
            e.preventDefault()
            setErrorMessage("")

            if (loginObj.email.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
            if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
            else {
                setLoading(true)
                // Call API to check user credentials and save token in localstorage
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    },
                };

                const body = JSON.stringify(loginObj);

                const response = await axios.post('/auth/login', body, config);

                if (response?.status === 200) {
                    localStorage.setItem("token", response.data.data.token)
                    localStorage.setItem("access", JSON.stringify(response.data.data))
                    setLoading(false)
                    window.location.href = '/app/dashboard'
                }
            }
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setLoading(false)
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (
        <div className="flex items-center min-h-screen bg-base-200">
            <div className="w-full max-w-2xl mx-auto shadow-xl card">
                <div className="bg-base-100 rounded-xl">
                    <div className='px-10 py-24 m-10'>
                        <h2 className='mb-2 text-2xl font-semibold text-center'>Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>
                            <div className="mb-4">
                                <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />
                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
                            </div>
                            {/* <div className='text-right text-primary'><Link to="/forgot-password"><span className="inline-block text-sm transition duration-200 hover:text-primary hover:underline hover:cursor-pointer">Forgot Password?</span></Link>
                            </div> */}
                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>
                            <div className='mt-4 text-center'>Don't have an account yet? <Link to="/register"><span className="inline-block transition duration-200  hover:text-primary hover:underline hover:cursor-pointer">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login