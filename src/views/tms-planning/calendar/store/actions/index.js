import CalendarService from '../../../../../services/CalendarService'

// ** Fetch Events
export const fetchEvents = (calendars, site) => {

  return dispatch => {
    CalendarService.getAll({
      calendars,
      site
    }).then(response => {
      dispatch({
        type: 'FETCH_EVENTS',
        events: response.data
      })
    })
  }
}

// ** Filter Events
export const updateFilter = (filter, site) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      filter
    })
    if (getState().calendar.selectedCalendars.length > 0) {
      dispatch(fetchEvents(getState().calendar.selectedCalendars, site))
    }
  }
}

// ** Add/Remove All Filters
export const updateAllFilters = value => {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_ALL_FILTERS',
      value
    })
    dispatch(fetchEvents(getState().calendar.selectedCalendars))
  }
}

// ** Select Event (get event data on click)
export const selectEvent = event => {
  return dispatch => {
    dispatch({
      type: 'SELECT_EVENT',
      event
    })
  }
}