import React, { Component } from 'react'
import PropTypes from "prop-types"

import Item from '../Item'
import './index.css'
export default class List extends Component {
  static propTypes = {
    changeTodo:PropTypes.func.isRequired,
    todos:PropTypes.array.isRequired,
    deleteTodo:PropTypes.func.isRequired,
  } 
  render() {
  const {todos,changeTodo,deleteTodo} = this.props
    return (
      <ul className="todo-main">
        {
          todos.map((todo)=>{
            return  <Item key={todo.id}  {...todo} changeTodo={changeTodo} deleteTodo={deleteTodo}> </Item>
          })
        }
    </ul>
    )
  }
}
