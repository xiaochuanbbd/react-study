babel翻译:npx babel --watch src --out-dir . --presets react-app/prod
# 基础部分
## react特点
 1. 组件化模式，声明式编码
 2. 在reaxt-native中可以使用react语法进行移动端开发
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

## react 18 更新 ReactDOM.render

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

## 组件实例的核心属性（仅包括类式组件，不包括函数式组件）
### state
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

#### createRef
* 一次只能存储一个dom节点
* 创建一个用于一个
设置  myRef =  React.createRef()
读取： this.myRef.current.xxx


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
