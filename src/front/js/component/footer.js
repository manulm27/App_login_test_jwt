import React, { Component } from "react";
import { Context } from "../store/appContext";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Footer = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context)

	let view_button = () => {
		let value = localStorage.getItem('token')
		if (value != null) {
			return 'element-show'
		} else {
			return 'd-none'
		}
	}

	return (
		<footer className="footer mt-auto py-3 text-center">
			<p>
				Made by{" "}
				<a href="#">Manuel Martret</a>
			</p>
			<button className={'btn btn-primary m-2' + " " + view_button()} onClick={() => {
				actions.logout()
					.then((res) => {
						navigate('/login')
						return res
					})
					.then((res) => { alert(res.message) })
			}}>Logout</button>


		</footer>
	)
}
