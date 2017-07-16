import React from "react";
import { Button,message,Tabs} from 'antd';
import {url} from "./url"
import axios from 'axios'
const TabPane = Tabs.TabPane;
class Home extends React.Component{
	constructor(){
		super()
		this.state={
			data:{
				all:{topics:[],page:1},
				good:{topics:[],page:1},
				ask:{topics:[],page:1},
				share:{topics:[],page:1},
				job:{topics:[],page:1},
			}
		}
	}
getData(tab,page){
axiso.get(`${url}/topics?limit=20&tab=${tab==="all"?"":tab}&page=${page}`)
.then(res=>console.log(res))
.cath(err=>message.error("请求失败"))
}
componentDIdMount(){
	this.getData("all",1)
}
handeChange(key,tab){
	console.log(key,tab)
	
}
	render(){
		let {data}=this.state
		return(
					<div>
						<Tabs defaultActiveKey="all" onChange={this.handeChange.bind(this)}>
					    <TabPane tab="全部" key="all">
					    全部
					    </TabPane>
					    <TabPane tab="精华" key="good">
					    精华
					    </TabPane>
					    <TabPane tab="分享" key="ask">
					    分享
					    </TabPane>
					    <TabPane tab="问答" key="share">
					    问答
					    </TabPane>
					    <TabPane tab="招聘" key="job">
					    招聘
					    </TabPane>
					  </Tabs>
					</div>
			)
	}
}

export default Home