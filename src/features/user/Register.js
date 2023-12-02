import { useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorText from '../../components/Typography/ErrorText'
import HelperText from '../../components/Typography/HelperText'
import InputText from '../../components/Input/InputText'
import axios from 'axios';

function Register() {

    const INITIAL_REGISTER_OBJ = {
        userName: "",
        password: "",
        email: "",
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)

    const submitForm = async (e) => {
        try {
            e.preventDefault()
            setErrorMessage("")
            setSuccessMessage("")

            if (registerObj.userName.trim() === "") return setErrorMessage("Username is required! (use any value)")
            if (registerObj.email.trim() === "") return setErrorMessage("Email is required! (use any value)")
            if (registerObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
            else {
                setLoading(true)
                // Call API to check user credentials and save token in localstorage
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    },
                };

                const body = JSON.stringify(registerObj);

                const response = await axios.post('/auth/register', body, config);

                if (response?.status === 200) {
                    setSuccessMessage(response.data.message)
                    setLoading(false)
                }
            }
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setLoading(false)
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setRegisterObj({ ...registerObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-2xl  shadow-xl">
                <div className="bg-base-100 rounded-xl">
                    <div className='py-24 px-10 m-20'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                        <form onSubmit={(e) => submitForm(e)}>
                            <div className="mb-4">
                                <InputText defaultValue={registerObj.userName} updateType="userName" containerStyle="mt-4" labelTitle="Username" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
                            </div>
                            <div>
                                {successMessage ? (
                                    <HelperText styleClass="mt-8">{successMessage}</HelperText>
                                ) : (
                                    <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                                )}
                            </div>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Register</button>
                            <div className='text-center mt-4'>Already have an account? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register