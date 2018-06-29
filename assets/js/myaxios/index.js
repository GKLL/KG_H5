import axios from 'axios'
export default {
	get(){
		return new Promise((resolve, reject)=>{
			axios.get(...arguments)
			.then((res)=>{
          		resolve(res.data);
			})
			.catch((error)=>{
				reject(error);
			})
		})
	},
	post(){
		return new Promise((resolve, reject)=>{
			axios.post(...arguments)
			.then((res)=>{
				resolve(res.data);
			})
			.catch((error)=>{
				reject(error);
			})
		})
	},
	axios(){
		return new Promise((resolve, reject)=>{
			axios(...arguments)
			.then((res)=>{
				resolve(res.data);
			})
			.catch((error)=>{
				reject(error);
			})
		})
	}
}