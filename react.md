babel翻译:npx babel --watch src --out-dir . --presets react-app/prod
# 基础部分
## react特点
 1. 组件化模式，声明式编码
 2. 在react-native中可以使用react语法进行移动端开发
 3. 使用虚拟dom+diff 尽量减少真实dom交互

## react核心文件
 ```js
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script> // 核心库 扩展库
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"  crossorigin></script> //操作dom库
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script> //转换jsx为js ,es6为而es5
 ```
 ps: 引入顺序核心库首先引入 

 ## hello world
 ```js
  const VDOM = <h1>hello react</h1> //   1. 创建虚拟dom 这里是jsx语法， 
 ReactDOM.render(VDOM,document.getElementById('root'))//2. 渲染虚拟dom
 ```

 ## 虚拟dom
 1. 本质就是Object类型的对象 （一般对象）
 2. 虚拟dom 熟悉比较少的属性 真实dom 属性很多，因为虚拟dom是react在使用，无需真实dom上面那个多属性
 3. 虚拟dom 会被react转换为真实dom

 ## jsx语法规则
 全称： javascript XML
1. 不要写语法
2. 标签里使用js表达式(会产生一个值)需要使用花括号 {} ，**不可以使用js语句**
3. 样式类名不能使用class，需要使用classname
4. 内联样式style需要使用{{width:200px}} 第一个括号是代表要使用js语法，第二个表示要使用对象的格式
5. 虚拟dom只能有1个根标签
6. 标签必须闭合
7. 标签首字母
    * 小写字母， 标签改为html标签，html没有就报错
    * 大写字母 react渲染对应的组件，找不到报错

## react 18 更新 ReactDOM.render，以后绑定dom
```js
// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App   />);
```

## react定义组件
### 函数式组件（无状态 state）
```js
// 1. 创建函数式组件
function Dome(){
    // this指向：为undefined，因为Babel翻译后会开启严格模式 
    return <h1 className="title">我是函数定义的组件适用于简单组件的定义 </h1>
}
// 2. 渲染组件到页面 
ReactDOM.render(<Dome/>,document.getElementById('root'))
/* 执行  ReactDOM.render会执行：
1. react先解析组件标签，找到Dome组件，
2. 调用函数，将返回的虚拟dom转为真实dom,呈现页面
*/
```
#### 复习js类
1. 类的构造器不是非必要写的，如需对实例进行初始化操作，如添加属性才写
2. 如果A类继承了B类， A中写了构造器， A必须书写super
3. 类所定义的方法，都在类的原型上，供实例使用
```js
    class Person {
      constructor(name, age) {
        //  this指类的实例
        this.name = name
        this.age = age
      }
      speak() { //类的一般方法，放在类的原型上，给实例使用
        //  this指类的实例
        console.log(`${this.name},`);
      }
    }
    //继承类 继承Person
    class Student extends Person {
      constructor(name, age, grade) {
        super(name, age) //必须调用哦。顺序必须在最开始
        //  this指类的实例
        this.grade = grade
      }
      //重写父类的方法
      speak() {   
        console.log(`${this.name},${this.grade}`);
      }
    }
```

### 类式组件（有状态 state）
1. 必须有render函数
2. render函数必须有返回值
```js
 
class MyComponent extends React.Component{//React.Component 内置的类
    constructor(props){//可以省略
        super(props)
    }
    render(){
         //1. render在类的原型上，供实例使用，给实例使用
        // 2. render中this  是MyComponent组件实例对象 props: {}refs: {}state: null
        return <h1 className="title">我是class定义的组件适用于简单组件的定义 </h1>
    }

}
//<MyComponent/> 当书写这个，react会帮助new一个实例
ReactDOM.render(<MyComponent/>,document.getElementById('root'))
/* 执行  ReactDOM.render(<MyComponent/>...会执行：
1. react先解析组件标签，找到MyComponent组件，
2. <MyComponent/> 当书写这个，react会帮助new一个实例，并通过该实例调用原型上的render方法
2. 将render返回的虚拟dom转为真实dom,呈现页面
*/
```

## 组件实例的核心属性
（仅包括类式组件，不包括函数式组件）
### state
不是state的几种情况：
* 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
* 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
* 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

* setState()修改state状态，只能用这个修改state 
* 更新动作是合并动作不是替换
```js
class Weather extends React.Component{
     /*
         1.更新动作是合并动作不是替换
         2. 构造器只执行一次（constructor）
         3. render方法调用1+n次，n是更新次数
         4. changeHot是点几次调用几次
        */ 
    constructor(porps){
        super(porps)
        this.state = {
            isHot:true,wind:'微风'
        }
        //改变实例方法调用this为undefined的问题
        this.changeHot = this.changeHot.bind(this)
    }
    render() {
        const {isHot,wind} =  this.state 
        return (<h1 onClick={  this.changeHot }>今天天气很{ isHot?'炎热':'寒冷'},{wind}</h1>)
    }
    changeHot( ){
        //this为undefined
        // this.state.isHot=!this.state.isHot//错误写法
        this.setState({isHot:!this.state.isHot})
       
    }

}
```
state的简写方式
*  所有在class 定义的组件自定义的方法需要写成：赋值语句+箭头函数（这样是将方法 绑定在实例上，箭头函数中的this不会丢失，指向实哩对象）


### props 
* {...props} 传输，从this.props中拿
* 默认值设置，类型设置
ps: react 16版本之后放在了propType.js中拿(之前是放在React.PropTypes中获取)
```js
// 类型设置 给类本身添加
staic propTypes = {
  name:PropTypes.string.isRequired//必填
  age:PropTypes.string
  sex:PropTypes.
}
// 默认值设置
staic defaultProps = {
  sex:'女'
}
```
* props是只读的会报错，只可以运算不可以修改
* props简写需要将原来定义在类外面的值通过staic关键字用于class内部，给class使用

#### render props
指一种在react组中使用函数作为props,并且该函数返回一个react元素并调用他，而不是实现他自己的渲染逻辑
render prop 是一个用于告知组件需要渲染什么内容的**函数 prop**



#### props函数式组件里面是传递通过参数传递props，默认值和初始值都只写在函数的外面

### refs
* 字符串形式的ref（最简单）
* 回调形式的ref,参数是这个ref所在的dom节点，内联在jsx中
  * 回调形式的ref，执行次数的问题：
    至少执行一次（render时候调用一次）
    更新时候会调用两次
```js
    <input ref={(input)=>{this.input1 = input}} type="text" placeholder="点击按钮提示数据"/> 
```
* 定义class绑定的函数。只会执行一次
```js
    <input ref={this.saveinput} type="text" placeholder="点击按钮提示数据"/>
```
### 创建ref:
this.myRef = React.createRef();

ref中的current属性在个节点类型中不同的表现
* ref挂到html中，current为其do元素
* 用于class组件， current为接受组件的挂载实例，例如可以调用封装组件中的方法，属性等。 this.xxxComponent.current.xxx()
* 使用ref传递回调的形式可以在父组件内获取子组件的值
**不可以在函数组件中使用ref,因为函数没有实例**



### ref 转发
允许父组件创建ref，并向下传递给自组件，获取子组件的ref
注意点 ： 必须挂在dom元素上，挂在组件上无效
```js
import React,{useRef,useEffect} from 'react'
//forwardRef 接受的函数的第二个参数即ref
const FancyButton = React.forwardRef((props, ref) => (
  <input ref={ref}  />
));
const RefLink = ()=>{
  const btnref =React.createRef()//创建一个ref 也可以使用useRef()
  const handerclick = ()=>{
    btnref.current?.focus()
  }
  return (
    <div>
    {/* 将ref通过props传递下去， */}
     <FancyButton  ref={btnref} >ref</FancyButton>
     <button   onClick={handerclick} > click me</button>
    </div>
  )
}
export default  RefLink
```

 
##  Fragment
用于书写根节点的地方
注：在循环中使用需要提供给key, 单标签形式不支持提供props
```js
    <React.Fragment>
      <td>hello</td>
      <td>react</td>
    </React.Fragment>
    或者：
     <>
      <td>hello</td>
      <td>react</td>
    </>
```

## 高阶组件 Hoc
* 纯函数
* 高阶组件是参数为组件，返回值为新组件的函数
* 替换之前的mixin混合代码
* refs 需要通过 react.forwardRef()函数来进行传递

## jsx 深入
* React.createElement(component, props, ...children) 函数的语法糖。
* jsx 可以使用点语法
* 自定义组件必须大写开头
* 自定义组件不能使用表达式
* props默认值不传为true
* props可以通过扩展运算符传递
* 标签中间的内容，会作为props.children往下传递（标签航首位的空格以及空行，与标签相邻的空行均会被删除）
* {showHeader && <Header />} 仅当 showHeader 为 true 时，才会渲染 <Header /> 组件

## Portals 将子节点渲染到父组件之外的dom元素
React.createProtal(child,container)
child:任何可渲染的react子元素
container： dom元素
使用案例： 对话框，悬浮卡，提示框
* protals绑定的元素会冒泡

## diffing算法
1. 比较根节点，根节点不同，直接替换
如：
```js
<div>
  <Counter />
</div>
替换成：
<span>
  <Counter />
</span>
React 会销毁 Counter 组件并且重新装载一个新的组件。
```
2. 对比统一类型的元素，保留dom节点，仅对比及更新有改变的属性
3. 对比同类型的组件元素 当一个组件更新时，组件实例保持不变，这样 state 在跨越不同的渲染时保持一致。React 将更新该组件实例的 props 以跟最新的元素保持一致，并且调用该实例的 componentWillReceiveProps() 和 componentWillUpdate() 方法。

## key的作用
主要用于diff算法计算列表的新增和修改时使用，增加性能。
key 不需要全局唯一，但需要在列表中保持唯一


## react 中的事件处理
* 通过onXxx属性指定时间处理函数 
  * react使用的自定义合成的事件。 并不是原生的dom事件
  * react中的时间是通过事件委托方式处理的，委托给组件最外层的元素， 为了高效
* event.target 获取发生事件的目标元素

## 函数柯理化
* 通过函数调用继续返回函数的方式，实现多次接受参数最后统一处理的函数编码形式
```js
onChange={this.saveFormdate('username')}//将一个函数给onchange作为回调
 saveFormdate=(type)=>{ 
        return (e)=>{//返回的新函数
            this.setState({
                [type]:e.target.value
                })
        }
      
    }
```
* 高阶函数：
  * 接受的参数是一个函数，
  * 调用的返回值是一个函数
常见的高阶函数：
  * promise，setTimeout, arr.map()

## 生命周期
### 旧版本：
* componentWillMount  组件将要被挂载
* componentDidMount() 在生命周期 组件完成挂载调用 （常用）操作：开启定时器发送网络请求，订阅消息等此方法是服务端渲染唯一会调用的生命周期函数。
*  render() 初始化渲染。状态更新之后（必须要用）
* shouldComponentUpdate() 组件是否要被更新，控制组件被更新的阀门。必须写返回值：true/false。false表示都不更新
* componentWillUpdate 组件将要被更新
* componentDidUpdate(preprops,prestate)) 组件更新完毕 preprops之前的props prestate：之前的state
* componentWillReceiveProps  组件将要接受新的props时候 第一次不算
* componentWillUnmount() 组件将要卸载时候掉用（常用）操作： 关闭定时器， 取消订阅消息
 

#### 执行顺序：
##### 挂载时：
1. constructor
2. componentWillMount
3. render
4. componentDidMount
##### 更新时：
###### setUpdate:
1. shouldComponentUpdate
2. componentWillUpdate
3. componentDidUpdate
###### foreUpdate() 强制更新
1. componentWillUpdate
2. componentDidUpdate
###### 父组件render，子组件更新：
1. componentWillReceiveProps
2. shouldComponentUpdate
3. componentWillUpdate
4. componentDidUpdate
##### 卸载时： 
1. componentWillUnmount
### 新版本：
#### 新增：
* getDerivedStateFromProps(porps,state) 即 state 的值在任何时候都取决于 props 。特殊情况才使用，了解即可
* getSnapshotBeforeUpdate(){return :xxx}  更新前获取的快照此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。 xxx会传给componentDidUpdate
#### 废弃：
* componentWillMount ==> UNSAFE_componentWillMount
* componentWillUpdate ==>UNSAFE_componentWillUpdate
* componentWillReceiveProps ==> UNSAFE_componentWillReceiveProps
#### 更新
当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate(preprops,prestate) preprops之前的props prestate：之前的state

### 重要的钩子
1. render 初始化或者更新渲染时候掉用
2. componentDidMount  开启监听如：ajax
3. componentWillUnmount  即将卸载的钩子

## 组合继承
props.children 作为插槽插入


## diff算法
原理：
react进行新虚拟dom和旧虚拟dom的diff比较
比较规则：
1. 有相同的key
  1. 有新的内容直接替换
  2. 没有新的内容不变
2. 没有相同的key
  1. 直接替换
用index作为key可能会出现的问题
1. 当需要对数据进行逆序添加，逆序删除等破坏顺序是修改时会影响格式数据错乱
2. 性能更低，需要对虚拟dom进行全部更新

## 文件
* src/index.js
  入口的js文件
  ```js
  // 检查app里的东西是否合理
  <React.StrictMode>
    <App />
  </React.StrictMode>
  ```
* index.html 应用入口文件
* App.js app组件
* xxx.jsx 组件名字， 引入时候可以不加后缀 ，如果交index也可以不加，js和jsx都可以不要加


 
### 样式模块化
 文件名：hello.module.css
 引入： impoet hello from './index.module.css'

 ## react 插件
  快速生成react的注解 ES7+ React/Redux/React-

## todoList 案例
1. 拆分组件
2. 动态初始化列表
3. 父子组件通信
   1. 父向子： props
   2. 子向父： 父组件定义一个函数，通过props传递给子组件 子组件通过调用函数传参数的形式修改数据
4. checked 和defualtChecked区别 defualtChecked第一次才执行
5. 在状态（数据定义的地方）修改状态（定义函数）
6. 状态提升：将数据定义在共同的父组件
## 组件通信方式
* 父向子
 props
* 子修改父组件的
使用父组件定义函数传递给子组件修改数据,状态在哪里，操作的状态的就在哪里


## react 配置代理
1. 在pageage.json中 书写： "proxy":"http://localtion:3000"
2. src/setupProxy.js配置（webpack自动读取）
```js
const {createProxyMiddleware: proxy} =require('http-proxy-middleware');
// 暴露一个module出去
module.exports = function (app){
    app.use(
        proxy('/api1',{//apis遇见这个前缀请求就是会走代理
           target:'http://localhost:5001',
           changeOrigin:true,// 控制服务器收到的请求头host字段的值，让服务器以为是自己的端口发的请求
            pathRewrite: {'^/api1': '',},//重写请求路径
        }),
        proxy('/api2',{
            target:'http://localhost:5002',
            changeOrigin:true,
            pathRewrite: {'^/api2': '',},
        }),
    )
}
```

##  react hooks
状态是什么
状态机：数据 + 改变状态的行为 
比如： 点赞数是怎么增加的

### 什么是hooks
描述状态后的行为
一个视图，使用了hooks1 hooks2 等

### 状态useState()
精简代码，使用js函数的方式抛弃class
* useState不能出现在if判断当中

### 作用Effect
useEffect (deps) 本质是一个函数调用
依赖【变化】变化的作用，如传入state， 就是依赖state数据变化的作用，即每次state更新就会执行，创建一个新的uesEffect函数，如传入空，那么只会执行一次
* return 的地方会在组件销毁时候关闭
* useEffect Hook 类是componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
* effext 是可选的清除机制，每个effext都可以返回一个清除函数，可以将挂载和移除订阅的逻辑放在玉琪。
* 每个effect都是一个函数逻辑，允许我们按照代码的用途分离他们
* 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[] ），作为第二个参数。[] 作为第二个参数更接近大家更熟悉的 componentDidMount 和 componentWillUnmount 思维模式
*  React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect 
## 上下文 createContext()

## hooks运行机制
* 不要在循环，条件或嵌套函数中调用 Hook，

## 自定义hooks
* 自定义 Hook 必须以 “use” 开头
* 在两个组件中使用相同的 Hook 不会共享 state 


## react-router
react-router 核心库
react-router-dom web
react-router-native rn使用
```js
import React from "react"; //不是结构赋值，是文件内有多个暴露的形式
import Hoc from "./test/Hoc";
import About from "./test/pages/About/About";
import Home from "./test/pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import AboutChild1 from "./test/pages/About/Child";
import AboutChild from "./test/pages/About/Child1";
const App = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />}>
        <Route path="aboutchild" element={<AboutChild />}></Route>
        <Route path="aboutchild1" element={<AboutChild1 />}></Route>
        <Route element={<AboutChild1 />}></Route>
      </Route>
      <Route path="/home" element={<Home />}></Route>
      {/*初始值*/}
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
};

export default App;
```
### BrowserRouter和HashRouter 
BrowserRouter为H5中的history路由
hashRouter为hash路由，会携带# 号
### < Routes/> 和 < Route/> 
routes包裹route
```js
  <Routes>
            <Route path="/about" element={<About />}></Route>
            <Route path="/home" element={<Home />}></Route>
  </Routes>
```
 <Routes/>替换<Switch/>  了
router6.0之后switch更改为 <Routes></Routes>
它的作用是匹配到下面的第一个路由组件，下面的路由组件就不再进行匹配展示了 。不同于< Router/> 

#### < Route/> 
* 可以做大小写匹配

### < Link/>和 < NavLink/>
声明式的可访问的导航
共同属性：
* to: string 路径
* to: object 
  * pathname: 表示链接路径的字符串。
  * search: 表示查询参数的字符串, 例如： ?key=value。
  * hash: 要放入URL的散列， 例如： #a-hash。
  * state: 状态将持续存在在 location 中。
* replace 替换历史堆栈中的当前条目
* innerRef: 允许访问ref组件的底层
* other 其他放在A 标签上面的属性
###  < NavLink/>
NavLink有高亮，link没有


###  组件 < Navigate/>组件 
只要组件被渲染，1会修改路径，切换试图
用于重定向组件：
6.0之前是redirect，现在更改为Navigate
```js
<Route path="/" element={<Navigate to="/about" />}></Route>
```
属性：
* to: 必须的， 
* replace： 默认为false 为push

### useRoutes()
生成路由表
```js
import About from "../test/pages/About/About";
import Home from "../test/pages/Home/Home";
import { Navigate } from "react-router-dom";
export default [
   {
    path: "/home",
    element: <Home></Home>,
    //嵌套的路由
    children: [
      {
        path: "news",
        element: <News></News>,
      },
      {
        path: "message",
        element: <Message></Message>,
      },
    ],
  },
  {
    path: "/about",
    element: <About></About>,
  },
  {
    path: "/",
    element: <Navigate to="/about" />,
  },
];
```
### < Outlet/>
制定路由呈现的路径
```js
   < Outlet/>//展示路由组件
```
类似vue的< route-view/>

### 传参的方式
* params
```js
// 传递：
  <Link to={"detail" + "/" + m.id + "/" + m.title + "/" + m.content}>
              {m.title}
  </Link>
  // routes表里：
  children: [
          {
            path: "Detail/:id/:title/:content",
            element: <Detail></Detail>,
          },
        ],
  // 使用params参数，需要借助hooks
import React from "react";
import { useParams } from "react-router-dom";
export default function Detail(props) {
  const { id, title, content } = useParams();
  return (
    <ul>
      <li>id:{id}</li>
      <li>title:{title}</li>
      <li>content:{content}</li>
    </ul>
  );
}

```
* search
```js
//定义传参
 <Link to={`detail?id=${m.id}&title=${m.title}&content=${m.content}`}>
    {m.title}
 </Link>
// 使用参数 search.get("id")
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
export default function Detail(props) {
  const [search, setSearch] = useSearchParams(); //类似useState setSearch更新收到的search参数
  return (
    <ul>
      <li>id:{search.get("id")}</li>
      <li>title:{search.get("title")}</li>
      <li>content:{search.get("content")}</li>
    </ul>
  );
}
```
* state 
```js
// 传参
 <Link to="detail" state={{ id: m.id, title: m.title, content: m.content }}>
   {m.title}
 </Link>
 //接受
import React from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
export default function Detail(props) {
  const {
    state: { title, id, content },
  } = useLocation(); //连续结构赋值
  return (
    <ul>
      <li>id:{id}</li>
      <li>title:{title}</li>
      <li>content:{content}</li>
    </ul>
  );
}
```
###  编程式导航
```js
import React, { Fragment, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Message() {
  const [messages] = useState([
    { id: "001", title: "消息1", content: "11e2e2" },
    { id: "002", title: "消息2", content: "11e2e2" },
    { id: "003", title: "消息3", content: "11e2e2" },
  ]);
  const navigate = useNavigate(); //获取跳转函数
  const showDetail = (m) => {
    navigate("detail", {
      replace: false, //表示为push跳转
      state: {
        //只可以写state参数
        id: m.id,
        title: m.title,
        content: m.content,
      },
    });
  };

  return (
    <Fragment>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>
            <button onClick={() => showDetail(m)}>查看详情</button>
          </li>
        ))}
      </ul>
      <Outlet />
    </Fragment>
  );
}
```

## router-hooks
### useInRouterContext()
返回：是否处于router上下文环境中
### useNavigateType()
返回当前的导航类型 
* POP 刷新
* PUSH 
* REPLACE
### useOutlet()
呈现当前组件中所嵌套的路由组件
**未挂载的时候是null**

### useResolvePath()
解析路径的hash值