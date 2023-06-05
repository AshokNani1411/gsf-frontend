// ** React Imports
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { retrieveAnnouncements } from "../../../../redux/actions/announcement"
// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, Volume2 } from 'react-feather'
import {
  Media,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

const NotificationDropdown = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(retrieveAnnouncements())
  }, [])
  const announcements = useSelector(state => state.announcements)
  announcements.map(a => {
    a.avatarIcon = <Volume2 size={14} />
    a.color = 'light-warning'
    return a
  })

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {announcements.map((item, index) => {
          return (
            <a key={index} className='d-flex' href='/' onClick={e => e.preventDefault()}>
              <Media
                className='d-flex align-items-start'
              >
                <Fragment>
                  <Media left>
                    <Avatar
                      {...(item.img
                        ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                        : item.avatarContent
                        ? {
                            content: item.avatarContent,
                            color: item.color
                          }
                        : item.avatarIcon
                        ? {
                            icon: item.avatarIcon,
                            color: item.color
                          }
                        : null)}
                    />
                  </Media>
                  <Media body>
                    <p className='mb-0'>{item.X10CSUBJECT_0}</p>
                    <small className='notification-text' dangerouslySetInnerHTML={{ __html: item.X10CSUBDES_0}}></small>
                  </Media>
                </Fragment>
              </Media>
            </a>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        {/* <Badge pill color='danger' className='badge-up'>
          5
        </Badge> */}
      </DropdownToggle>
      <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>Announcements</h4>
            {/* <Badge tag='div' color='light-primary' pill>
              6 New
            </Badge> */}
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        {/* <li className='dropdown-menu-footer'>
          <Button.Ripple color='primary' block tag={Link} to={`/announcement`}>
            View All Announcements
          </Button.Ripple>
        </li> */}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
