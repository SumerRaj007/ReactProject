import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'

function Header() {
  let user= JSON.parse(localStorage.getItem("user-info"));
  console.warn(user);
 const navigate=useNavigate();
  function logout()
  {
    localStorage.clear();
    navigate("/Register");
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href='#Home'>Navbar</Navbar.Brand>
        <Nav className='mr-auto nav_bar_wrapper'>
          {
            localStorage.getItem("user-info") ?
              <>
               <Link to="/">Product List</Link>
                <Link to="/Add">Add Product</Link>
                <Link to="/Update/1">Update Product</Link>
                <Link to="/Search">Search Product</Link>
              </>
              :
              <>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
              </>
          }
        </Nav>
        localStorage.getItem("user-info") ?
        <Nav>
          <NavDropdown title={user && user.name}>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            <NavDropdown.Item>Profile</NavDropdown.Item>
            
          </NavDropdown>
        </Nav>
        : null
      </Navbar>
    </div>
  )
}
export default Header;