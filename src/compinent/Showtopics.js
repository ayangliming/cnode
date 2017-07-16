import React from "react";
import { Spin } from 'antd';
import {Link} from "react-router-dom"

class Showtopics extends React.Component{
	state={
		catch:false
	}
	componentDidMount(){
		this.props.data?this.setState({catch:true}):this.setState({catch:true})
	}
	render(){
		
		let {data}=this.props
		let tabs ={
			ask:"问答",
			share:"分享",
			job:"招聘"
		}
		return(
				<div className="topics_wrap">
					{
						this.state.catch?
							data.map(
									item=>
									<div key={item.id} className="topics_main">
											<Link to={{pathname:`/user/${item.author.loginname}`,state:item.author.loginname}}>
												<img src={item.author.avatar_url}/>
											</Link>	
										<div>
												<h3 title={item.title}><Link to={`/topic/${item.id}`}>{item.title}</Link></h3>
												<span className="tab">{item.top?"置顶":item.good?"精华":tabs[item.tab]}</span>
												<span>回复数：<strong>{item.reply_count}</strong></span>
												<span>点击量：<strong>{item.visit_count}</strong></span>
										</div>
									</div>
								)
						: <div><Spin size="large"/></div> 
					}
				</div>

			)
	}
}
export default Showtopics
