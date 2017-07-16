import React from "react";
import { Button, Modal,Input,message,Menu,Avatar,Dropdown} from 'antd';
import {url} from "./url"
import axios from 'axios'

class Header extends React.Component{
	constructor(){
		super()
		this.state={
			visible:false,
			isLogin:false,
			input:"3f77acb1-d753-4393-b784-44913190e6a8",
			user:null,
			confirmLoading:false
		}
	}
	handleonok(){
		this.setState({confirmLoading:true})
		let accesstoken=this.state.input
	axios.post(`${url}/accesstoken`,{accesstoken})
	.then(res=>
	{
		message.success('登陆成功')
		console.log(res)
		this.setState({
		visible:false,
		isLogin:true,
		user:res.data
			})
		sessionStorage.accesstoken=accesstoken
	})
	.catch(err=>{message.error("登陆失败")
		this.setState({confirmLoading:false,input:""})
		})
	}
	handeclick(){
		this.setState({
			isLogin:false,
			user:null
		})
			sessionStorage.removeItem("accesstoken")
	}
	render(){
		let {visible,isLogin,input,user,confirmLoading} = this.state
		const menu =!isLogin?<p>haha</p> :(
		  <Menu>
		    <Menu.Item>
		      <a target="_blank" rel="noopener noreferrer">{user.loginname}</a>
		    </Menu.Item>
		    <Menu.Item>
		      <a target="_blank" rel="noopener noreferrer">个人中心</a>
		    </Menu.Item>
		    <Menu.Item>
		     <Button onClick={this.handeclick.bind(this)}>退出</Button>
		    </Menu.Item>
		  </Menu>
		  );
		return(
					<div className="header">
					<h1>cnode</h1>
					{
						isLogin?
						 <Dropdown overlay={menu}>
						   <Avatar src={user.avatar_url}/>
						  </Dropdown>
						  :
					<div>
					<Button type="primary" onClick={()=>this.setState({visible:true})}>登录</Button>
					<Modal
          title="登录"
          visible={visible}
          onOk={this.handleonok.bind(this)}
          confirmLoading={confirmLoading}
          onCancel={()=>this.setState({visible:false})}
        >
        <Input placeholder="accesstoken" value={input} onChange={(e)=>this.setState({input:e.target.value})} />
        </Modal>
				</div>
			}
		</div>


			)
	}
}

export default Header