import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "./home";
import { element } from "prop-types";

export const Login = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [alert, setAlert] = useState('')

    const response = (data) => {
        if (data.status == 200) {
            setAlert(false)
            navigate('/')
        } else {
            console.log(data)
            setStatus(data.data)
            setAlert(true)
            store.user = {}
        }
    }

    const view_alert = () => {
        if (alert == true) {
            return 'element-show'
        } else {
            return 'd-none'
        }
    }

    return (
        <div className="container w-50 p-4">
            <h1 className="text-center mb-4">Login</h1>
            <form actions='#'>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username' onChange={(e) => {
                        actions.collection_login(e.target)
                        setUsername(e.target.value)
                    }} id="InputUsername1" aria-describedby="usernameHelp" value={username} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={(e) => {
                        actions.collection_login(e.target)
                        setPassword(e.target.value)
                    }} id="InputPassword1" value={password} />
                </div>
            </form>
            <button type="submit" className="btn btn-primary mb-3" onClick={() => {
                let data = actions.request_login()
                    .then((res) => {
                        return res
                    })
                    .then((res) => response(res))

                setUsername('')
                setPassword('')
            }}>Iniciar sesion</button>

            <div className={'alert alert-danger' + " " + view_alert()} role="alert">
                {status}
            </div>
        </div>
    );
}

export default Login;