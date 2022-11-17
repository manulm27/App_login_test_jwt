import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { resolvePath } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const { user, setUser } = useState({})

	useEffect(() => {
		let load = actions.view_protected()
		.then((res)=>console.log(res))
	}, [])

	return (
		<div className="text-center mt-5">
			<h1>Welcome {store.session.map((data, i)=>{return data.username})}</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
					Read documentation
				</a>
			</p>
		</div>
	);
};
