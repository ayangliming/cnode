import React from "react";
import axios from "axios"
import {url} from '../config'
import {message, Button,Card,Avatar,Input,Icon,Modal } from 'antd';
import moment from "moment"
class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data:null,
			comment:"",
			visible:false,
			reply:"",
			replyin:null
		}
	}
	getData(){
		let id = this.props.match.params.id
		axios.get(`${url}/topic/${id}`)
		.then(res=>this.setState({data:res.data.data}))
		.catch(err=>message.error("请求失败"))
	}
	componentDidMount(){
		this.getData()
	}
	handcomment(type){
		if(sessionStorage.accesstoken){
			var accesstoken=sessionStorage.accesstoken
		}else{
			alert("请登录")
			return
		}

		if (type==="comment") {
			var content = this.state.comment
		}else{
			var content = this.state.reply
		}
		let data={accesstoken,content}
		let id = this.state.data.id
		axios.post(`${url}/topic/${id}/replies`,data)
		.then(res=>{console.log(res)
							this.setState({comment:""})
							this.getData()
							if (type==="reply")this.setState({visible:false})
						})
		.catch(err=>message.error("提交失败"))
	}
	handReply(reply){
		
		this.setState({visible:true, replyin:reply, reply:`@${reply.author.loginname} `})
	}
	handlelike(reply_id){
		if(sessionStorage.accesstoken){
			var accesstoken=sessionStorage.accesstoken
		}else{
			alert("请登录")
			return
		}
		axios.post(`${url}/reply/${reply_id}/ups`,{accesstoken})
			.then(res=>this.getData())
			.catch(err=>message.error("失败"))
	}
	render(){
		let {data,comment,reply,visible,replyin} = this.state
		console.log(data)
		return(
				<div style={{padding:"10px"}}>
				<Card loading={!data}>
			   	{
			   		data?(
				<div>
						<h3 style={{textAlign:"center"}}>{data.title}</h3>
			   		<div className="topic">
			   		<Avatar src={data.author.avatar_url}/>
			   			<span>回复量：{data.reply_count}</span>
							<span>阅读量：{data.visit_count}</span>
			   		</div>
			   		<div dangerouslySetInnerHTML={{__html:data.content}} className="topic_wrap"/>
			   			<h1>回复：</h1>
			   	<Input type="textarea" rows={4}  value={comment} onChange={e=>this.setState({comment:e.target.value})}/>
			   	<Button onClick={this.handcomment.bind(this,"comment")}>提交</Button>

			   	<h1>全部回复：</h1>
			   	{
						data.replies.map(item=>(
								<div className="comment" key={item.id}>
									<Avatar src={item.author.avatar_url}/>
									<div className="comment_header">
											<div className="comment_right">
												<span>{item.author.loginname}•{moment(item.create_at).fromNow()}</span>
												<span>
												<Icon type="like-o" onClick={this.handlelike.bind(this,item.id)}/>{item.ups.length}&nbsp;&nbsp;
												<Icon type="rollback" onClick={this.handReply.bind(this,item)}/>
												</span>
											</div>
										<div dangerouslySetInnerHTML={{__html:item.content}}/>
									
									</div>
								</div>


							))
			   	}
				</div>

			   			):null
			   	} 
			  </Card>
						 <Modal
			          title={replyin?`回复：${replyin.author.loginname}`:'回复：'}
			          visible={visible}
			          onOk={this.handcomment.bind(this,"reply")}
			          onCancel={()=>this.setState({visible:false})}
			        >
			    <Input type="textarea" rows={4}  value={reply} onChange={e=>this.setState({reply:e.target.value})}
						ref={input=>this.input=input}
			  />
			   
			        </Modal>
				</div>


			)
	}
}
export default Topic