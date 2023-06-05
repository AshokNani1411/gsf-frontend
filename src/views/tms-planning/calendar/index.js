// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Select from 'react-select'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Label, FormGroup, Button } from 'reactstrap'

// ** Calendar App Component Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './AddEventSidebar'

import { retrieveSites } from "../../../redux/actions/site"

import { toast, Slide } from 'react-toastify'

import { selectThemeColors } from '@utils'
import Avatar from '@components/avatar'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchEvents,
  selectEvent,
  updateFilter,
  updateAllFilters
} from './store/actions/index'

// ** Styles
import '@styles/react/apps/app-calendar.scss'
import { AlertTriangle } from 'react-feather'

// ** CalendarColors
const calendarsColor = {
  'Sales Delivery': 'success',
  'Pick Ticket': 'primary',
  'Sales Return': 'warning',
  Pickup: 'success',
  'Purchase Return': 'danger',
  'Purchase Order': 'blue',
  'Sales Order': 'purple',
  'Purchase Invoice': 'info',
  'Sales Invoice': 'info',
  'Purchase Receipt': 'warning'
}

const ToastContent = ({header, message, color}) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={<AlertTriangle size={12} />} />
        <h6 className='toast-title font-weight-bold'>{header}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

const CalendarComponent = () => {
  // ** Variables
  const dispatch = useDispatch()
  const sites = useSelector(state => state.sites)
  const store = useSelector(state => state.calendar)
  const userData = JSON.parse(localStorage.getItem('userData'))

  const siteOptions = sites.map(c => {
    return {value: c.FCY_0, label: `${c.FCY_0} (${c.FCYNAM_0})`}
  })

  // ** states
  const [addSidebarOpen, setAddSidebarOpen] = useState(false),
    [leftSidebarOpen, setLeftSidebarOpen] = useState(false),
    [calendarApi, setCalendarApi] = useState(null),
    [site, setSite] = useState(userData.X3SITE_0)

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL()

  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  // ** LeftSidebar Toggle Function
  const toggleSidebar = val => setLeftSidebarOpen(val)

  // ** Blank Event Object
  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  }

  // ** refetchEvents
  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents()
    }
  }

  // ** Fetch Events On Mount
  useEffect(() => {
    dispatch(retrieveSites())
  }, [])

  const filterData = () => {
    if (!store.selectedCalendars.length > 0) {
      toast.warning(
        <ToastContent header='Warning' message='Select Categoty' color='warning' />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    } else if (!site) {
      toast.warning(
        <ToastContent header='Warning' message='Select Site' color='warning' />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    } else {
    dispatch(fetchEvents(store.selectedCalendars, site))
    }
  }

  const resetData = () => {
    setSite(null)
    dispatch(fetchEvents(store.selectedCalendars, null))
  }

  return (
    <Fragment>
      { userData.X3ROLE_0 === 4 ? (
        <Card>
          <CardHeader>
            <CardTitle>Choose Site & Date</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md='4' lg='3'>
                <FormGroup>
                  <Label for='site'>Site <span className='text-danger'>*</span></Label>
                  <Select
                    id='site'
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    name='site'
                    placeholder='Select Site'
                    options={siteOptions}
                    isClearable
                    value={siteOptions.filter(s => s.value === site)}
                    onChange={event => { setSite(event ? event.value : null) }}
                  />
                </FormGroup>
              </Col>
              <Col md='4' lg='3' className="d-flex align-items-end">
                <FormGroup>
                  <Button.Ripple className='mr-1' color='primary' type='button' onClick={filterData}>
                    Submit
                  </Button.Ripple>
                  <Button.Ripple outline color='secondary' type='reset' onClick={resetData}>
                    Reset
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
        ) : "" }
      <div className='app-calendar overflow-hidden border'>
        <Row noGutters>
          <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >
            <SidebarLeft
              store={store}
              site={site}
              dispatch={dispatch}
              updateFilter={updateFilter}
              toggleSidebar={toggleSidebar}
              updateAllFilters={updateAllFilters}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <Col className='position-relative'>
            <Calendar
              isRtl={isRtl}
              store={store}
              dispatch={dispatch}
              blankEvent={blankEvent}
              calendarApi={calendarApi}
              selectEvent={selectEvent}
              toggleSidebar={toggleSidebar}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      <AddEventSidebar
        store={store}
        dispatch={dispatch}
        open={addSidebarOpen}
        selectEvent={selectEvent}
        calendarApi={calendarApi}
        refetchEvents={refetchEvents}
        calendarsColor={calendarsColor}
        handleAddEventSidebar={handleAddEventSidebar}
      />
    </Fragment>
  )
}

export default CalendarComponent
