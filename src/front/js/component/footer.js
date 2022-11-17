import React, { Component } from "react";
import { Context } from "../store/appContext";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Footer = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context)

	return (
		<footer className="footer mt-auto py-3 text-center">
			<p>
				Made by{" "}
				<a href="#">Manuel Martret</a>
			</p>
			<button className="btn btn-primary m-2" onClick={actions.view}>View store</button>
			<button className="btn btn-primary m-2" onClick={() => {
				actions.logout()
				navigate('/login')
			}}>Cerrar session</button>
		</footer>
	)
}
