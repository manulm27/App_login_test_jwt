import React, { Component } from "react";
import { Context } from "../store/appContext";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Footer = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context)
	const [ session, setSession ] = useState('')

	let view_button = ()=>{
		let value = localStorage.getItem('token')
		if (value != null){
			return 'element-show'
		}else{
			return 'd-none'
		}
	}

	return (
		<footer className="footer mt-auto py-3 text-center">
			<p>
				Made by{" "}
				<a href="#">Manuel Martret</a>
			</p>
			<button className="btn btn-primary m-2" onClick={actions.view}>View store</button>
			<div className={view_button()}>
			<button className="btn btn-primary m-2" onClick={() => {
				actions.logout()
				.then((res)=>{console.log(res)})
				.then((res)=>{navigate('/login')})
			}}>Logout</button>
			</div>

		</footer>
	)
}
