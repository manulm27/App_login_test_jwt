import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Register = () => {
    const { store, actions } = useContext(Context)

    const new_user = (event)=>{
        const { name, value } = event.target
        const new_data = store.register
        new_data[name] = value
        console.log(event.target)
        console.log(new_data)
    }

    return (
        <div className="container w-50 p-4">
            <form actions='#'>
                <div className="mb-3">
                    <label for="username" className="form-label">Username</label>
                    <input type="username" className="form-control" name='username' onChange={new_user} id="InputUsername1" aria-describedby="usernameHelp" />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">E-mail</label>
                    <input type="email" className="form-control" name='email' onChange={new_user} id="InputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={new_user} id="InputPassword1" />
                </div>
            </form>
            <button type="submit" className="btn btn-primary" onClick={actions.register}>Registrar</button>
        </div>
    );
}

export default Register;