// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import classnames from 'classnames'
import { CardBody, CustomInput } from 'reactstrap'

const SidebarLeft = props => {
  // ** Props
  const { updateFilter, store, dispatch, site } = props

  let filters = []
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData.X3ROLE_0 === 2) {
    filters = [
      { label: 'Sales Order', value: 'Sales Order', color: 'purple', className: 'custom-control-purple mb-1' },
      { label: 'Sales Delivery', value: 'Sales Delivery', color: 'success', className: 'custom-control-success mb-1' },
      { label: 'Pick Ticket', value: 'Pick Ticket', color: 'primary', className: 'custom-control-primary mb-1' },
      { label: 'Sales Return', value: 'Sales Return', color: 'warning', className: 'custom-control-warning mb-1' },
      { label: 'Sales Invoice', value: 'Sales Invoice', color: 'info', className: 'custom-control-info mb-1' }
    ]
  } else if (userData.X3ROLE_0 === 3) {
    filters = [
      { label: 'Purchase Order', value: 'Purchase Order', color: 'blue', className: 'custom-control-blue mb-1' },
      // { label: 'Pickup', value: 'Pickup', color: 'success', className: 'custom-control-success mb-1' },
      { label: 'Purchase Receipt', value: 'Purchase Receipt', color: 'warning', className: 'custom-control-warning mb-1' },
      { label: 'Purchase Return', value: 'Purchase Return', color: 'danger', className: 'custom-control-danger mb-1' },
      { label: 'Purchase Invoice', value: 'Purchase Invoice', color: 'info', className: 'custom-control-info mb-1' }
    ]
  }
  return (
    <Fragment>
      <div className='sidebar-wrapper'>
        <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Categories</span>
          </h5>
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <CustomInput
                    type='checkbox'
                    key={filter.label}
                    id={filter.label}
                    label={filter.label}
                    checked={store.selectedCalendars.includes(filter.value)}
                    className={classnames({
                      [filter.className]: filter.className
                    })}
                    onChange={e => dispatch(updateFilter(filter.value, site))}
                  />
                )
              })}
          </div>
        </CardBody>
      </div>
    </Fragment>
  )
}

export default SidebarLeft
