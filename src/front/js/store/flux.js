import { bool } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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

			view: ()=>{
				console.log(getStore())
			},
			collection_login: (e)=>{
				const data = e
				const { name, value } = data
				getStore().user[name] = value
				return getStore().user
			},
			request_login: async ()=> {
				try{
					const resp = await fetch('http://localhost:3001/token',
					{
						method: 'POST',
						body: JSON.stringify(getStore().user),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const data = await resp.json()
					console.log(data)
					localStorage.setItem('token', data['token'])
					return data
				}catch(err){
					console.log({'Error': err})
				}
			},
			collection_register: (e)=>{
				const data = e
				const { name, value } = data
				getStore().register[name] = value
				return getStore().register
			},
			request_register: async ()=> {
				try{
					const resp = await fetch('http://localhost:3001/user',
					{
						method: 'POST',
						body: JSON.stringify(getStore().register),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const data = await resp.json()
					console.log(data)
					return data
				}catch(err){
					console.log({'Error': err})
				}
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch("http://localhost:3001/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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
