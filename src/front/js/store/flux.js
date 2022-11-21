import { bool } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			session: [],
			resp_login: {},
			message: null,
			register: {},
			user: {},
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			request_login: async () => {
				try {
					const resp = await fetch('http://localhost:3001/login',
						{
							method: 'POST',
							body: JSON.stringify(getStore().user),
							headers: {
								'Content-Type': 'application/json'
							}
						})
					const data = await resp.json()
					if (resp.status == 200) {
						localStorage.setItem('token', data['token'])
						return { 'status': resp.status, 'data': data.message }
					}else{
						return { 'status': resp.status, 'data': data.message }
					}
				} catch (err) {
					console.log({ 'Error': err })
				}
			},

			request_register: async () => {
				try {
					const resp = await fetch('http://localhost:3001/user',
						{
							method: 'POST',
							body: JSON.stringify(getStore().register),
							headers: {
								'Content-Type': 'application/json'
							}
						})
					const data = await resp.json()
					getStore().register = {}
					return { 'status': resp.status, 'mesagge': data.message }
				} catch (err) {
					console.log({ 'Error': err })
				}
			},

			collection_login: (e) => {
				const data = e
				const { name, value } = data
				getStore().user[name] = value
				return getStore().user
			},

			collection_register: (e) => {
				const data = e
				const { name, value } = data
				getStore().register[name] = value
				return getStore().register
			},

			view_protected: async () => {
				let hash = localStorage.getItem('token')
				try {
					const resp = await fetch('http://localhost:3001/protected',
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': 'Bearer ' + hash
							}
						}
					)
					const data = await resp.json()
					if (resp.status == 200) {
						if (getStore().session.length >= 1) {
							return data
						} else {
							setStore({ session: [...getStore().session, data] })
							return data
						}

					}
				} catch (err) {
					console.log(err)
				}
			},

			logout: async () => {
				let hash = localStorage.getItem('token')
				try {
					const resp = await fetch('http://localhost:3001/logout',
						{
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': 'Bearer ' + hash
							}
						}
					)
					const data = await resp.json()
					localStorage.removeItem('token')
					setStore({ session: [], user: {} })
					return data
				} catch (err) {
					console.log(err)
				}
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch("http://localhost:3001/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
