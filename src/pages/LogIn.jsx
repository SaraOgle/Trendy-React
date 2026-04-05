import { Link } from "react-router-dom"


const Login = () => {

  return (
    <div className='checkout-page'>
      <h2>Login</h2>

      <input type='text' placeholder='Username' />
      <input type='text' placeholder='Password' />
      <p>Don't have an account?</p>
      <Link to="/signup" className="log__link">SignUp</Link>


      <button>Login</button>
    </div>
  )
}


export default Login
