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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Weather = function (_React$Component) {
    _inherits(Weather, _React$Component);

    function Weather(porps) {
        _classCallCheck(this, Weather);

        var _this = _possibleConstructorReturn(this, (Weather.__proto__ || Object.getPrototypeOf(Weather)).call(this, porps));

        _this.state = {
            isHot: true, wind: '微风'
        };
        _this.changeHot = _this.changeHot.bind(_this);
        return _this;
    }

    _createClass(Weather, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                isHot = _state.isHot,
                wind = _state.wind;

            return React.createElement(
                'h1',
                { onClick: this.changeHot },
                '\u4ECA\u5929\u5929\u6C14\u5F88',
                isHot ? '炎热' : '寒冷',
                ',',
                wind
            );
        }
    }, {
        key: 'changeHot',
        value: function changeHot() {
            this.setState({ isHot: !this.state.isHot });
        }
    }]);

    return Weather;
}(React.Component);

ReactDOM.render(React.createElement(Weather, null), document.getElementById('root'));