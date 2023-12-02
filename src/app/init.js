import axios from "axios"

const initializeApp = () => {

    // Setting base URL for all API request via axios
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code

    } else {
        // Prod build code

        // Removing console.log from prod
        console.log = () => { };

        // init analytics here
    }

}

export default initializeApp