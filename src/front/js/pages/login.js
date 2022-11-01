import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
    const { store, actions } = useContext(Context)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const login_user = (event) => {
        const { name, value } = event.target
        const user = store.user
        user[name] = value
        return user
    }

    return (
        <div className="container w-50 p-4">
            <form actions='#'>
                <div className="mb-3">
                    <label for="username" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username' onChange={(e) => {
                        login_user(e)
                        setUsername(e.target.value)
                    }} id="InputUsername1" aria-describedby="usernameHelp" value={username} />
                </div>
                <div className="mb-3">
                    <label for="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={(e) => {
                        login_user(e)
                        setPassword(e.target.value)
                    }} id="InputPassword1" value={password} />
                </div>
            </form>
            <button type="submit" className="btn btn-primary" onClick={() => {
                if (username.length == 0 || password.length == 0) {
                    alert('Ingresa tus datos correctamente!')
                } else {
                    actions.login()
                }
                setUsername('')
                setPassword('')
            }}>Iniciar sesion</button>
        </div>
    );
}

export default Login;