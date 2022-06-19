'use strict';
/**
 1. 创建虚拟dom
 2. 渲染虚拟dom
 */
//  const data =  ['angular','vue','react']
//  const VDOM = (
//    <div>
//        <h1>框架合集 </h1>
//        <ul>
//            {
//                data.map((i,index)=>{
//                    return <li key={index}>{i}</li>
//                })
//            }

//        </ul>
//    </div>
//  )
//  //   1. 创建虚拟dom 这里是jsx语法， 
//  ReactDOM.render(VDOM,document.getElementById('root'))//2. 渲染虚拟dom
// 1. 创建函数式组件
// function Dome(){
//     // this指向：为undefined，因为Babel翻译后会开启严格模式 
//     return <h1 className="title">我是函数定义的组件适用于简单组件的定义 </h1>
// }
// // 2. 渲染组件到页面 
// ReactDOM.render(<Dome/>,document.getElementById('root'))
// /* 执行  ReactDOM.render会执行：
// 1. react先解析组件标签，找到Dome组件，
// 2. 调用函数，将返回的虚拟dom转为真实dom,呈现页面
// */
// //  1. 创建类式组件
// /*
// 1. 必须有render函数
// 2. render函数必须有返回值
// */
// class MyComponent extends React.Component{//React.Component 内置的类
//     constructor(props){//可以省略
//         super(props)
//     }
//     render(){
//          //1. render在类的原型上，供实例使用，给实例使用
//         // 2. render中this  是MyComponent组件实例对象 props: {}refs: {}state: null
//         return <h1 className="title">我是class定义的组件适用于简单组件的定义 </h1>
//     }

// }
// //<MyComponent/> 当书写这个，react会帮助new一个实例
// ReactDOM.render(<MyComponent/>,document.getElementById('root'))
// /* 执行  ReactDOM.render(<MyComponent/>...会执行：
// 1. react先解析组件标签，找到MyComponent组件，
// 2. <MyComponent/> 当书写这个，react会帮助new一个实例，并通过该实例调用原型上的render方法
// 2. 将render返回的虚拟dom转为真实dom,呈现页面
// */
// class Weather extends React.Component{
//      /*
//          1.更新动作是合并动作不是替换
//          2. 构造器只执行一次（constructor）
//          3. render方法调用1+n次，n是更新次数
//          4. changeHot是点几次调用几次
//         */ 
//     constructor(porps){
//         super(porps)
//         this.state = {
//             isHot:true,wind:'微风'
//         }
//         //改变实例方法调用this为undefined的问题
//         this.changeHot = this.changeHot.bind(this)
//     }
//     render() {
//         const {isHot,wind} =  this.state 
//         return (<h1 onClick={  this.changeHot }>今天天气很{ isHot?'炎热':'寒冷'},{wind}</h1>)
//     }
//     changeHot( ){
//         //this为undefined
//         // this.state.isHot=!this.state.isHot//错误写法
//         this.setState({isHot:!this.state.isHot})

//     }

// }
// class Weather extends React.Component{

//    constructor(porps){
//        super(porps)
//    }
//    state = { isHot:true,wind:'微风'}
//    render() {
//        const {isHot,wind} =  this.state 
//        return (<h1 onClick={  this.changeHot}>今天天气很{ isHot?'炎热':'寒冷'},{wind}</h1>)
//    }
//    changeHot = ( )=>{
//        console.log(this);
//        this.setState({isHot:!this.state.isHot})
//    }

// }
// ReactDOM.render(<Weather/>,document.getElementById('root') )
// class Person extends React.Component{
//      constructor(props){
//          super(props)
//      }
//     render(h) {
//         console.log(this);
//         let {name,age} = this.props
//         return (
//             <ul>
//                 <li>姓名：{name}</li>
//                 <li>年龄：{age}</li>
//                 {/* <li>性别{this.props.age}</li> */}
//             </ul>
//         )
//     }

// }
// let obj = {name:'tom',age:19}
// ReactDOM.render(<Person {...obj}/>,document.getElementById('root'))
// class Demo extends React.Component{
//     myRef =  React.createRef()
//     render(){
//         return (
//             <div>
//                 {/* <input ref={(input)=>{this.input1 = input}} type="text" placeholder="点击按钮提示数据"/>  */}
//                 <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>
//                 <button  onClick={this.showData}>点我失去左侧的数据</button>
//                 <input   ref={(input)=>{this.input2 = input}} onBlur={this.showData2}  type="text" placeholder="失去焦点提示数据"/> 
//             </div>
//         )
//     }
//     saveinput=(input)=>{
//     this.input1 = input
//     }
//     showData=()=>{
//         console.log(this.myRef.current.value);
//     }
//     showData2=()=>{
//         const {input2}  = this
//         alert(input2.value)
//     }
// }
// ReactDOM.render(<Demo/>,document.getElementById('root'))
// class Login extends React.Component {
//     state={
//      username:"",
//      password:""
//     }
//     render() {
//         return (
//             <form  onSubmit={this.handlersumbit}>
//             用户名：<input type="text" onChange={this.saveFormdate('username')} ref={c=>this.username=c} name="username"/>
//             密码：<input type="password"  onChange={this.saveFormdate('username')}  ref={c=>this.password=c}  name="password"/>
//                <button>登录</button>
//              </form>
//         )
//     }
//     saveFormdate=(type)=>{
//         return (e)=>{
//             this.setState({
//                 [type]:e.target.value
//                 })
//         }
      
//     }
 
//     handlersumbit = (e) => { 
//         e.preventDefault();
//         const {
//             password,
//             username
//         } = this.state
//         console.log(111,password,username);
//     }
// }
// ReactDOM.render( <Login/> , document.getElementById('root'))
// class Lift extends React.Component{
//     state={opacity:1}
//     //render调用时机：初始化渲染。状态更新之后
//     render(h) { 
//         console.log(123); 
//         return (
//             <div>
//                 <h2 style={{opacity:this.state.opacity}}>react学不会</h2>
//                 <button onClick={this.death}>不活了</button>
//             </div>
//         )
//     }
//     death=()=>{
//         ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//     }
//     //在生命周期 组件完成挂载调用
//     componentDidMount(){
//         let {opacity}= this.state

//        this.timer=  setInterval(() => {
//             opacity -= 0.1
//             if(opacity <= 0) opacity = 1
//             this.setState({opacity})
//         }, 200);
//     }
//     //组件将要卸载时候掉用
//     componentWillUnmount(){
//         clearInterval(this.timer)
//     }
// }
// ReactDOM.render( <Lift/> , document.getElementById('root'))

// class Count extends React.Component{
//     constructor(props){
//         console.log('constructor');

//         super(props)
//         this.state={count:0}
//     }
//      static getDerivedStateFromProps(){
//         console.log('getDerivedStateFromProps');
//         return null
//      }
//     componentDidMount(){
//         console.log('componentDidMount');
//     }
//     shouldComponentUpdate(){
//         console.log('shouldComponentUpdate');
//         return true 
//     }
 
//     componentDidUpdate(){
//         console.log('componentDidUpdate');
//     }
    
//     render(){
//         console.log('render');

//         return (
//             <div>
//                 <h2>当前求和为{this.state.count}</h2>
//                 <button onClick={this.add}>+1</button>
//             </div>
//         )
//     }
//     add=()=>{
//         this.setState({count:this.state.count+1})
//     }
// }
// ReactDOM.render( <Count/> , document.getElementById('root'))

class Demo extends React.Component{
    state={newList:[]}
    componentDidMount(){
        setInterval(()=>{
            const {newList} = this.state
            const news = '新闻' +(newList.length+1)
            this.setState({newList:[news,...newList]})
        },1000)
    }
getSnapshotBeforeUpdate(){
        return this.refs.list.scrollHeight
    }
    componentDidUpdate(preprops,prestate,height){
        this.refs.list.scrollTop += this.refs.list.scrollHeight - height 
    }
    render(){
    const {newList} = this.state
        return (
            <div  className="list-warp" ref="list">
                {
                    newList.map((n,index)=>{
                        return  <div  className="list" key={index}>{n}</div>
                    })
                }
            </div>
        )
    }
}
ReactDOM.render( <Demo/> , document.getElementById('root'))
