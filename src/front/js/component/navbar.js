import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

	let view_button = ()=>{
		let value = localStorage.getItem('token')
		if (value != null){
			return 'd-none'
		}else{
			return 'element-show'
		}
	}
	return (
		<nav className={"navbar navbar-light bg-secondary" + " " +view_button()}>
			<div className="container-fluid d-flex">
				<Link className="me-auto p-2" to="/">
					<button className="btn btn-primary">Home</button>
				</Link>
				<Link className="p-2" to="/register">
				<button className="btn btn-primary">Register</button>
				</Link>
				<Link className="p-2" to="/login">
					<button className="btn btn-primary">Login</button>
				</Link>
			</div>
		</nav>
	);
};
