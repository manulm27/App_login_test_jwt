import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { resolvePath } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.view_protected()
			.then((res) => console.log(res))
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className={store.session.length > 0 ? 'element-show' : 'd-none'}>Welcome {store.session.map((data, i) => { return data.username })}</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				<h2>APP LOG_TEST</h2>
			</div>
			<p>
				You can see here the code of this app{" "}
				<a href="https://github.com/manulm27/App_login_test_jwt.git">
					Here
				</a>
			</p>
		</div>
	);
};
