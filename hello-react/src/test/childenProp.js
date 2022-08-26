
const    Dialog = (props)=>{
  return (
    <div  >
      <h1 >
        {props.left}
      </h1>
      <p>
        {props.right}
      </p>
     </div>
  )
}
const WelcomeDialog = ()=>{
  return (
    <Dialog left="welcome" right="thank you for visiting our">
    </Dialog>
  )
}
export default WelcomeDialog