// ** Third Party Components
import { MoreHorizontal } from 'react-feather'

const VerticalNavMenuSectionHeader = ({ item, index }) => {
  const role = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).XDESC_0
  if (item.permissions && item.permissions.includes(role.toLowerCase())) {
    return (
      <li className='navigation-header'>
        <div>
          <span>{item.header}</span>
          <MoreHorizontal className='feather-more-horizontal' />
        </div>
      </li>
    )
  } else {
    return ''
  }
}

export default VerticalNavMenuSectionHeader