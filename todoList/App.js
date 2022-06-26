import React,{Component} from 'react'//不是结构赋值，是文件内有多个暴露的形式
import './App.css'
import Header from './componets/Header'
import Footer from './componets/Footer'
import List from './componets/List'
//创建并暴露app组件
class App extends  Component{
  state={
    todos:[
      { id:1,name:'吃饭',done:true },
      { id:2,name:'睡觉',done:true },
      { id:3,name:'写代码',done:false },
      { id:4,name:'逛街',done:true }
    ]
  }
  addTodo=(todo)=>{
    const {todos} = this.state
    const newTodos = [todo,...todos]
   this.setState({
     todos: newTodos
   })
  }
  changeTodo=(id,done)=>{
    const {todos} = this.state
    const newTodos =  todos.map((todo)=>{
      if(todo.id===id){
       return {...todo,done}//接受原来的值，添加改变原来的值
      }else{
        return todo
      }
    })
    this.setState({
      todos:newTodos
    })
    
  }
  deleteTodo=(id)=>{
    const {todos} = this.state
    const newTodos =  todos.filter((todo)=>{
     return todo.id!==id
    })
    this.setState({
      todos:newTodos
    })
  }
  checkAll=(done)=>{
    const {todos} = this.state
    let newTodos = todos.map((todo)=>{
      return {...todo,done}
    })
    this.setState({
      todos:newTodos
    })
  }
  deleteChecked=()=>{
    const {todos} = this.state
    let newTodos = todos.filter((todo)=>{
      return  !todo.done 
    })
    this.setState({
      todos:newTodos
    })
  }
 render(){
  const {todos} =this.state
   return (
    <div className="todo-container">
     <div className="todo-wrap">
       <Header addTodo ={ this.addTodo}></Header> 
       <List todos={todos}  deleteTodo={this.deleteTodo}  changeTodo={this.changeTodo}></List>
       <Footer  todos={todos} checkAll={this.checkAll} deleteChecked={this.deleteChecked}></Footer>
      </div>
    </div>
    )
   }
  

 }

 export default App
