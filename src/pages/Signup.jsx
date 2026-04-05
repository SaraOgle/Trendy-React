import { Link } from "react-router-dom"

const Signup = () => {

  return (
    <div className='checkout-page'>
      <h2>SignUp</h2>

      <input type='text' placeholder='Name' />
      <input type='text' placeholder='Email' />
      <input type='text' placeholder='Password' />
      <p>Already have an account?</p>
      <Link to="/login" className="log__link" >Login</Link>



      <button>SignUp</button>
    </div>
  )
}


export default Signup