import React,{Component} from 'react'//不是结构赋值，是文件内有多个暴露的形式
import axios from "axios"
//创建并暴露app组件
class App extends  Component{
  getStudentData=()=>{
    axios.get('http://localhost:3000/api1/students').then(
      response=>{
        console.log(response.data);
        console.log('成功');},
      error=>{console.log('失败');}
    )
  }
 render(){
   return (
    <div  >
      <button onClick={this.getStudentData}>点我获取学生数据</button>
    </div>
    )
   }
  

 }

 export default App
