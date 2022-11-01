import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
    const { store, actions } = useContext(Context)

    const login_user = (event)=>{
        const { name, value } = event.target
        const user = store.user
        user[name] = value
        console.log(user)
    }

    return (
        <div className="container w-50 p-4">
            <form actions='#'>
                <div className="mb-3">
                    <label for="username" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username' onChange={login_user} id="InputUsername1" aria-describedby="usernameHelp" />
                </div>
                <div className="mb-3">
                    <label for="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={login_user} id="InputPassword1"/>
                </div>
            </form>
            <button type="submit" className="btn btn-primary" onClick={actions.login}>Iniciar sesion</button>
        </div>
    );
}

export default Login;