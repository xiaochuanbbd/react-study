import React, { Component } from 'react'
import './index.css'
export default class Footer extends Component {
  handlerCheckAll=(e)=>{
      this.props.checkAll(e.target.checked)
  }
  handlerCheckDelete=()=>{
      this.props.deleteChecked()
  }
  render() {
    const {todos} = this.props
    let total = todos.length
    let doneNum =  todos.reduce((pre,current)=>{
     return current.done?pre+1:pre+0
  },0)
    return (
      <div className="todo-footer">
      <label>
        <input type="checkbox" checked={total==doneNum && total!==0?true:false} onChange={this.handlerCheckAll} />
      </label>
      <span>
        <span>已完成{doneNum} </span> / 全部 {total}
      </span>
      <button onClick={this.handlerCheckDelete} className="btn btn-danger">清除已完成任务</button>
    </div>
    )
  }
}
