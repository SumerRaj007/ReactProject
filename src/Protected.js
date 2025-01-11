import Header from './Header'
import { useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'
function Protected(props) {
  let Cmp = props.cmp;
  const navigate = useNavigate();

  // redirect beacuase we want to not show unit user login if login then show add and update link or page
  // if user not login and try to go add or update page then its redirect to register page forcefully
  // once user register then it show add and update page , it will not go register page again
  
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      navigate("/Register")
    }
  })

  return (
    <div>
      <Cmp />
    </div>
  )
}
export default Protected;