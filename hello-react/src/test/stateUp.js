import {   useState,useEffect} from "react"
import React from 'react'//不是结构赋值，是文件内有多个暴露的形式
 
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
 
const BoilingVerdict = (props)=>{
    if(props.celsius>=100){
      return <div>水开啦</div>
    }else{
      return <div>还没开</div>

    }
}

const TemperatureInput  = (props)=>{
 const {temperature,scale} = props
 const handleChange = (e)=>{
  props.onTemperatureChange(e.target.value)
 }
return (
  <fieldset>
  <legend>Enter temperature in {scaleNames[ scale]}:</legend>
  <input
    value={temperature}
    onChange={handleChange} />
   
</fieldset>
)
}
const StateUp  = ()=>{
  const [temperature,setTemperture] = useState('')
  const [scale,setscale] = useState('c')
 const  handleCelsiusChange=(temperature)=> {
  setscale( 'c' )
  setTemperture(temperature)
  }
  const handleFahrenheitChange=(temperature) =>{
    setscale( 'f' )
    setTemperture(temperature)  }

  function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
  function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }
  function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }
  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
 return (
  <div>
     <TemperatureInput temperature={celsius} onTemperatureChange={handleCelsiusChange} scale='c'></TemperatureInput>
     <TemperatureInput temperature={fahrenheit} onTemperatureChange={handleFahrenheitChange} scale='f'></TemperatureInput>
     <BoilingVerdict
    celsius={parseFloat( temperature)} />
  </div>
  ) 
 
}

 

 export default StateUp
