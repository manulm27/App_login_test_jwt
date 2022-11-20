import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Register = () => {
    const { store, actions } = useContext(Context)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [resp, setResp] = useState('')

    const response = (data) => {
        console.log(data)
        setResp(data)
        store.register = {}
    }

    const color_alert = () => {
        if (resp.status == 200) {
            return 'info'
        } else {
            return 'danger'
        }
    }

    const view_alert = () => {
        if (resp != '') {
            return 'element-show'
        } else {
            return 'd-none'
        }
    }

    return (
        <div className="container w-50 p-4">
            <h1 className="text-center mb-4">Register</h1>
            <form actions='#'>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username' onChange={(e) => {
                        actions.collection_register(e.target)
                        setUsername(e.target.value)
                    }} id="InputUsername1" aria-describedby="usernameHelp" value={username} />
                </div>
                <div className="mb-3">
                    <label htmlFor="InpudEmail1" className="form-label">E-mail</label>
                    <input type="email" className="form-control" name='email' onChange={(e) => {
                        actions.collection_register(e.target)
                        setEmail(e.target.value)
                    }} id="InputEmail1" aria-describedby="emailHelp" value={email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={(e) => {
                        actions.collection_register(e.target)
                        setPassword(e.target.value)
                    }} id="InputPassword1" value={password} />
                </div>
            </form>
            <button type="submit" className="btn btn-primary" onClick={() => {
                actions.request_register()
                    .then((res) => { response(res) })

                setUsername('')
                setEmail('')
                setPassword('')
            }}>Registrar</button>

            <div className={'alert alert-' + color_alert() + " " + 'mt-4' + " " + view_alert()} role="alert">
                {resp.mesagge}
            </div>
        </div>
    );
}

export default Register;