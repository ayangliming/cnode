import React from "react";
import { Tabs,message, Button,BackTop } from 'antd';
import axios from 'axios'
import {url} from '../config'
const TabPane = Tabs.TabPane

import Showtopics from "./Showtopics"

class Home extends React.Component{
	constructor(){
		super()
		this.state={
			data:{
					all:{topics:[],page:1},
					good:{topics:[],page:1},
					ask:{topics:[],page:1},
					share:{topics:[],page:1},
					job:{topics:[],page:1}
			},
			tab: "all"
		}
	}
	getData(tab,page){
		axios.get(`${url}/topics?limit=20&tab=${tab==="all"? "":tab}&page=${page}`)
		.then(res=>{
				console.log(res)
				let newdata=this.state.data;
				newdata[tab].topics=[...newdata[tab].topics,...res.data.data]
				newdata[tab].page=page
				this.setState({data:newdata})}

			)
		.catch(err=>message.error("请求失败"))
	}
	componentDidMount(){
			this.getData("all",1)
		}
	handleChange(key,tab){
		this.setState({tab:key})
		if (this.state.data[key].topics.length===0) {
			this.getData(key,1)
		}else{
			return
		}
	}
	loadmove(tab){
	this.getData(tab,this.state.data[tab].page+1)
	}
	render(){
		let {data,tab}=this.state
		return(
				<div>
					<Tabs defaultActiveKey="all" onChange={this.handleChange.bind(this)}>
				    <TabPane tab="全部" key="all">
				    <Showtopics data={data.all.topics}/>
				    </TabPane>
				    <TabPane tab="精华" key="good">
				    <Showtopics data={data.good.topics}/>
				    </TabPane>
				    <TabPane tab="分享" key="ask">
				    <Showtopics data={data.ask.topics}/>
				    </TabPane>
				    <TabPane tab="问答" key="share">
				    <Showtopics data={data.share.topics}/>
				    </TabPane>
				    <TabPane tab="招聘" key="job">
				    <Showtopics data={data.job.topics}/>
				    </TabPane>
				  </Tabs>
						<Button type="primary" style={{width:"100%"}} onClick={this.loadmove.bind(this, tab)}>加载更多</Button>
					<BackTop />
				</div>
			)
	}
}

export default Home