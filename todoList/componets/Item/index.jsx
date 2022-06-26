import React, { Component } from 'react'
import PropTypes from "prop-types"
import './index.css'
export default class Item extends Component {
  static propTypes = {
    changeTodo:PropTypes.func.isRequired,
    deleteTodo:PropTypes.func.isRequired,
  } 
  state={mouse:false}
  handlerMouse=(flag)=>{
    return (e)=>{
      this.setState({mouse:flag})
    }
  }
  handlerChange=(id)=>{
    return(e)=>{
      // console.log(id,e.target.checked);
      this.props.changeTodo(id,e.target.checked)
    }
  }
  handlerDelete=(id)=>{
    if(window.confirm('确定删除吗')){
    this.props.deleteTodo(id)
  }

  }
  render() {
    const {id,name,done} = this.props
    return (
      <li style={{backgroundColor:this.state.mouse?'#ddd':'#fff'}} onMouseLeave={this.handlerMouse(false)} onMouseEnter={this.handlerMouse(true)}>
      <label>
        <input type="checkbox" checked={done} onChange={this.handlerChange(id)}  />
        <span>{name}</span>
      </label>
      <button onClick={()=>{this.handlerDelete(id)}} className="btn btn-danger" style={{display:this.state.mouse?'block':'none'}}>删除</button>
    </li>
    )
  }
 
}
