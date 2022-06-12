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




