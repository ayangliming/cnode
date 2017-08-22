import React from 'react'
import { Button, Modal, Input, message, Menu, Dropdown, Avatar,BackTop,Badge} from 'antd'
import axios from 'axios'
import {Link} from "react-router-dom"
import {url} from '../config'
const info = () => {
  message.info('登录成功');
};

class Header extends React.Component{
	constructor(){
		super()
		this.state={
				visible: false,
				isLogin: false,
				input:"fe49c8b3-35f8-4ce8-92b7-2d48bd50df73",
				confirmLoading:false,
				user:null,
				messageof:null
		}
	}
	handleok(){
		this.setState({confirmLoading:true})
		let accesstoken=this.state.input
		axios.post(`${url}/accesstoken`,{accesstoken})
		.then(res=>{
			console.log(res)
			message.success('登陆成功')
			this.setState({
				isLogin:true,
				confirmLoading:false,
				user:res.data
			})
			sessionStorage.accesstoken=accesstoken
			this.getMessage(accesstoken)
		})
		.catch(err=>{
			message.error("登陆失败")
			this.setState({confirmLoading:false,input:""})
			})
	}
	getMessage(accesstoken){
		axios.get(`${url}/message/count?accesstoken=${accesstoken}`)
		.then(res=>this.setState({messageof:res.data.data}))
		.catch(err=>message.error("获取失败"))
	}
	handlout(){
		this.setState({
			isLogin:false,
			visible:false,
			user:null
		})
		sessionStorage.removeItem("accesstoken")
	}
	render(){
		let {visible,isLogin,input,confirmLoading,user,messageof} = this.state
		const menu =!isLogin?<p>打我啊</p> : (
				  <Menu>
				    <Menu.Item>
				      <a target="_blank" rel="noopener noreferrer" >{user.loginname}</a>
				    </Menu.Item>
				    <Menu.Item>
				       <Link to={{pathname:`/user/${user.loginname}`,state:user.loginname}}>
				       个人中心
				       </Link>
				    </Menu.Item>
				     <Menu.Item>
				  	<Link to="/message">消息中心</Link>
				    </Menu.Item>
				    <Menu.Item>
				   	<Link to="/topics">发布话题</Link>
				    </Menu.Item>
				    <Menu.Item>
				   <Button type="danger" onClick={this.handlout.bind(this)}>退出</Button>
				    </Menu.Item>
				  </Menu>
		);
		return(
						<header className="header">
						<h3><Link to="/">CnOde</Link></h3>
			{isLogin?
				<Dropdown overlay={menu} trigger={['click']}>
					<Badge count={messageof} className="badge">
					<Avatar src={user.avatar_url}/>
					</Badge>

				 </Dropdown>
							:
						<div>
						<Button onClick={()=>this.setState({visible:true})}>登录</Button>
						<Modal
		          title="登录"
		          visible={this.state.visible}
		          onOk={this.handleok.bind(this)}
		          confirmLoading={confirmLoading}
		          onCancel={()=>this.setState({visible:false})}
		        >
		          <Input placeholder="accesstoken" value={input} onChange={e=>this.setState({
		          	input:e.target.value
		          })}/>
		        </Modal>
		    </div>
		  }
		  <BackTop />
	</header>


			)
	}
}

export default Header
