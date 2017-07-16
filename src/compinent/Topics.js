import React from "react";
import { Input, Select, Button,message } from 'antd';
import {Link} from "react-router-dom"
import {url} from '../config'
import axios from "axios"
const Option = Select.Option;
const { TextArea } = Input

class Topics extends React.Component{
	constructor(){
		super()
		this.state={
			tab:"dev",
			content:"",
			title:""
		}
	}
handleClick(){
			var accesstoken = sessionStorage.accesstoken
			if (!accesstoken) {
				alert("请登录")
				return
			}else{
				let {tab,content,title}=this.state
			let data ={tab,content,title,accesstoken}
		axios.post(`${url}/topics`,data)
		.then(res=>
				{
					console.log(res)
					let id = res.data.topic_id
					this.props.history.push(`/topic/${id}`)
				}
			)
		.catch(err=>message.error("提交失败"))
			}
			
		
	}


	render(){
		let {tab,content,title}=this.state
		return(
				<div className="wrap">
					<div>	
						<p ><Link to="/">主页</Link> /发布话题 </p>
						<div className="wrap_Select">
						选择板块：
								<Select
									    style={{ width: 200 }}
									    value={tab}
									    onChange={value=>this.setState({tab:value})}
									    
									  >
									     <Option value="ask">问答</Option>
						           <Option value="job">招聘</Option>
						           <Option value="share">分享</Option>
						           <Option value="dev">客户端测试</Option>
							 </Select><br/>
							 </div>
						<Input placeholder="标题字数 10 字以上" value={title}
						 onChange={e => this.setState({title:e.target.value})}
						 style={{marginBottom:"5px"}}/><br />
						<TextArea name="body" id="body" cols="30" rows="16" 
						onChange={e => this.setState({content:e.target.value})} value={content} /><br />
						<Button type="primary" onClick={this.handleClick.bind(this)}
						style={{marginTop:"5px",marginBottom:"5px"}}>提交</Button>
						</div>
				</div>

			)
	}
}

export default Topics