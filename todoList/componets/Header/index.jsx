import React, { Component } from 'react'
import PropTypes from "prop-types"
import {nanoid} from 'nanoid'
import './index.css'
export default class Header extends Component {
  static propTypes = {
    addTodo:PropTypes.func.isRequired
  } 
  render() {
    return (
      <div className="todo-header">
      <input onKeyDown={this.handlerKeydown} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
    </div>
    )
  }
  handlerKeydown=(e)=>{
    let {keyCode,target }= e
    if(keyCode!==13) return
    if(target.value.trim()==''){
      alert('输入不能为空')
      return
    }
    const todoObj ={ id:nanoid(),name:target.value,done:false}
    target.value=""
    this.props.addTodo(todoObj)
  }
}
