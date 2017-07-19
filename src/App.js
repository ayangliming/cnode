import React from "react"
import { HashRouter, Route} from 'react-router-dom'

import Header from "./compinent/Header.js"
// import Footer from "./compinent/Footer.js"
import Home from "./compinent/Home.js"
import Topic from  "./compinent/Topic.js"
import Message from  "./compinent/Message.js"
import User from  "./compinent/User.js"
import Topics from  "./compinent/Topics.js"
import Collect from './compinent/Collect'

class App extends React.Component{
	constructor(){
		super()
		sessionStorage.removeItem('accesstoken')
	}
	render(){
		return(
			<HashRouter>
				<div>
					<Header />
					<Route  path='/' exact component={Home} />
					<Route path='/topic/:id' component={Topic} />
					<Route path='/message' component={Message} />
					<Route path='/user' component={User} />
					<Route path='/topics' component={Topics} />
					<Route path='/collect' component={Collect} />
				</div>
			</HashRouter>
			)
	}
}

export default App
