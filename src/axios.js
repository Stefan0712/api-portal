import axios from "axios";

// Set up Axios default configuration
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';

export default axios;
