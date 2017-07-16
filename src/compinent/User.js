import React from "react"
import {url} from '../config'
import axios from 'axios'
import {message,Card,Avatar,Spin} from 'antd'
import moment from "moment"
import {Link} from "react-router-dom"
class User extends React.Component{
	constructor(){
		super()
		this.state={
			data:null
		}
	}
		componentDidMount(){
			console.log(this.props)
			let accesstoken=sessionStorage.accesstoken
			axios.get(`${url}/user/${this.props.location.state}`)
			.then(res=>
			{	console.log(res)
				this.setState({data:res.data.data})
			}
			
				)
			.catch(err=>message.error("请求失败"))

		}

	render(){
		let {data}=this.state
		console.log(data)
		return(
				<div>
				{
					!data?<Spin style={{textAlign:"center"}}/>
							:
					<Card title="主页 /" bordered={false} style={{ width: "100%" }} className="wrap_user">
						 <div >  
						 <p className="user">
						 <Avatar shape="square" size="large" src={data.avatar_url}/>
						 &nbsp;&nbsp;
						 {data.loginname}
						 </p>
				      <p>{data.score} 积分</p>
				      <p>注册时间 {moment(data.create_at).fromNow()}</p>

				      </div>
						     <div className="user_wrap" >
									<h3>最近创建的话题</h3>
									{
										data.recent_topics.map(item=>(
									<div key={item.id}>
								 <p className="user_main"> 
								 <Avatar shape="square" icon="user" src={item.author.avatar_url}/> 
								 &nbsp;&nbsp;
								 <Link to={`/topic/${item.id}`}>{item.title}</Link> 
								 </p>
									</div>
											))
									}
								</div>
							
											  <div  className="user_wrap">
													<h3>最近参与的话题</h3>
													{
														data.recent_replies.map(item=>(
													<div key={item.id}>
													<p className="user_main">
														<Avatar shape="square" icon="user" src={item.author.avatar_url}/>
														&nbsp;&nbsp;
													 <Link to={`/topic/${item.id}`}>{item.title}</Link> 
													</p>
													</div>
															))
													}
												</div>
				   </Card>
						
						
				}
				</div>


			)
	}
}

export default User