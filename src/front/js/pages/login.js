import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
    const { store, actions } = useContext(Context)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    return (
        <div className="container w-50 p-4">
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
            <button type="submit" className="btn btn-primary" onClick={() => {
                if (username == '' || password == '') {
                    alert('Ingresa tus datos correctamente!')
                } else {
                    actions.request_login()
                }
                setUsername('')
                setPassword('')
            }}>Iniciar sesion</button>
        </div>
    );
}

export default Login;