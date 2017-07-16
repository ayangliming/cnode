import React from "react"
import { BrowserRouter, Route} from 'react-router-dom'
import Header from "./Header"
import Home from "./Home"
class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
					<div>
						<Header />
						<Route path="/" component={Home} />
					</div>
					</BrowserRouter>

			)
	}
}

export default App