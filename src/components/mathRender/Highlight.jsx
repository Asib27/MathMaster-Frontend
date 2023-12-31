
const Highlight = ({type, children}) => {
  return (
    <div className={type===1 ? 'bg-green-100' : 'bg-red-100'}>
      {children}
    </div>
  )
}

export default Highlight