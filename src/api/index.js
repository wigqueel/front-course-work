// request.js
import axios from 'axios';
import {getCookie} from "../login";

const baseURL = 'https://abikeserver.herokuapp.com/v1/api/'

// optionaly add base url
const client = axios.create({baseUrl: `${baseURL}`});

const request = ({...options}) => {
    const token = getCookie('token');
    client.defaults.headers.common.Authorization = `Bearer ${token}`;

    const onSuccess = (response) => response;
    const onError = (error) => {
        // optionaly catch errors and add some additional logging here
        return error;
    }

    return client(options).then(onSuccess).catch(onError);
}

export const getSystems = () => {
    return fetch(`${baseURL}system/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTcHJpbmctU2VjdXJpdHktQXBwIiwic3ViIjoibWVwaGlzdG93a2EiLCJpYXQiOjE2NTQ0NDM1NjMsImp0aSI6IjMtMTY1NDQ0MzU2MzcwMSIsImV4cCI6MTY1NDQ0NzE2M30.crM43IbYuBoiiDGn85UU2ZfWVMFT-P5s-fcPF60Sil4`,
            "Content-Type": "application/json",
            "Accept": "*/*",
        }
    })
}

export function login({username, password}) {
    return fetch(`${baseURL}user/login/`, {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
        }
    })
}


export default request;