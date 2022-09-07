import React,{useState} from 'react'

const ProductCategroyRows = (props)=>{
  return (
    <tr>
        <th colSpan='2'>
          {props.category}
        </th>
    </tr>
  )
}
const ProductRows = (props)=>{
  const {product}=props
  const name = props.stocked?product.name:
  <span style={{color:'red'}}>
    {product.name}
  </span>
    return(
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
}
const ProductTabel = (props)=>{
  const rows = []
  let lastCategory = null
  const {filterText,inStorckOnly} = props
  props.products.forEach((product)=>{
    if(product.name.indexOf(filterText)===-1) return
    if(inStorckOnly && !product.stocked) return
    if(product.category!==lastCategory){
      rows.push(
        <ProductCategroyRows category={product.category} key={product.category}>
        </ProductCategroyRows>
      )
    }
    rows.push(
      <ProductRows product={product} key={product.name}></ProductRows>
    )
    lastCategory = product.category
  })
  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}
const SearchBar = (props)=>{
  return(
    <form>
      <input placeholder='search...' value={props.filterText} onChange={(e)=>props.handerChange(e.target.value)}></input>
      <p>
        <input type="checkbox" checked={props.inStorckOnly} onChange={()=>props.handlerCheckBox()}/> Only show products in stock 
      </p>
    </form>
  )
}
const FilterableProductTable = ()=>{
  const [filterText,setFilterText] = useState('')
  const [inStorckOnly,setInStorckOnly] = useState(false)
  const handerChange = (value)=>{
    setFilterText(value)
  }
  const handlerCheckBox = ()=>{
    setInStorckOnly(!inStorckOnly)
  }
  return (
    <div>
    <SearchBar filterText={filterText}inStorckOnly={inStorckOnly} handerChange={handerChange} handlerCheckBox={handlerCheckBox} ></SearchBar>
    <ProductTabel products={PRODUCT} filterText={filterText}inStorckOnly={inStorckOnly}></ProductTabel>
    </div>
  )
}
export default FilterableProductTable

const PRODUCT =  [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];