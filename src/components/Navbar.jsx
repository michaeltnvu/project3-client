import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

const Navbar = () => {
    
    const { logOutUser, getToken } = useContext(AuthContext)

  return (
    <nav>
        <Link to='/'>Home</Link>
        {
            !getToken() && (
            <>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
            </>
       )}

        {
            getToken() && (
            <>
                <Link to='/profile'>Profile</Link>
                <button onClick={logOutUser}>Logout</button>
            </>
        )}
    </nav>
  )
}

export default Navbar