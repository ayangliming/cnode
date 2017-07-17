import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import "./main.css"
import App from "./App.js"


import moment from "moment"
moment.locale('zh-cn');

console.log(moment(new Date()).fromNow())


ReactDOM.render(<App />,document.getElementById('root'))
