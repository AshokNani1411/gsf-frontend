// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NotificationDropdown from './NotificationDropdown'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props
  const userData = JSON.parse(localStorage.getItem('userData'))

  return (
    <Fragment>
      <ul className='nav navbar-nav align-items-center ml-auto'>
        {/* { (userData && (userData.X3ROLE_0 === 2 || userData.X3ROLE_0 === 3)) ? (
          <NotificationDropdown />
        ) : ""
        } */}
        <NavbarUser skin={skin} setSkin={setSkin} setMenuVisibility={setMenuVisibility} />
      </ul>
    </Fragment>
  )
}

export default ThemeNavbar
