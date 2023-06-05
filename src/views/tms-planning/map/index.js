import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import { selectThemeColors } from '@utils'
import { connect } from "react-redux"
import { retrieveSites } from "../../../redux/actions/site"
import { retrieveMapData } from "../../../redux/actions/map"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import { Row, Col, Card, CardBody, CardTitle, CardHeader, Form, FormGroup, Label, Button } from "reactstrap"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import moment from 'moment'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import { AlertTriangle } from 'react-feather'
import pinSuccess from '../../../assets/images/icons/pin-success.png'
import pinDanger from '../../../assets/images/icons/pin-danger.png'
import pinPrimary from '../../../assets/images/icons/pin-primary.png'
import pinWarning from '../../../assets/images/icons/pin-warning.png'
import pinInfo from '../../../assets/images/icons/pin-info.png'
import Moment from 'react-moment'

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

class MapsGoogle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromDate: '',
      toDate: '',
      selectedSite: '',
      docType: '',
      showingInfoWindow: false,
      selectedPlace: {},
      activeMarker: {}
    }
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onFilterData = this.onFilterData.bind(this)
    this.onResetFilter = this.onResetFilter.bind(this)
  }

  componentDidMount() {
    this.props.retrieveSites()
  }

  onFilterData(event) {
    event.preventDefault()
    if (!this.state.selectedSite) {
      toast.warning(
        <ToastContent header='Warning' message='Select Site' color='warning' />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    } else if (!this.state.docType) {
      toast.warning(
        <ToastContent header='Warning' message='Select Document Type' color='warning' />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    } else {
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      })
      this.props.retrieveMapData(this.state.selectedSite, this.state.docType, moment(this.state.fromDate).format('YYYY-MM-DD'), moment(this.state.toDate).format('YYYY-MM-DD'))
    }
  }

  onResetFilter() {
    this.setState({ selectedSite: '', fromDate: '', toDate: '', docType: '' })
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })
    this.props.retrieveMapData(null, null, null)
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props.data,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  render() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const sites = this.props.sites
    const siteOptions = sites.filter(s => s.FCY_0 === userData.X3SITE_0).map(c => {
      return {value: c.FCY_0, label: `${c.FCY_0} (${c.FCYNAM_0})`}
    })
    let docTypes = []
    if (userData.X3ROLE_0 === 2) {
      docTypes = [
        // {label: 'DROP REQUEST', value: 'DROP REQUEST'},
        {label: 'SALES ORDER', value: 'SALES ORDER'},
        {label: 'DELIVERY', value: 'DELIVERY'},
        {label: 'PICK TICKET', value: 'PICK TICKET'},
        {label: 'SALES RETURN', value: 'SALES RETURN'},
        {label: 'SALES INVOICE', value: 'SALES INVOICE'}
      ]
    } else if (userData.X3ROLE_0 === 3) {
      docTypes = [
        // {label: 'PICKUP REQUEST', value: 'PICKUP REQUEST'},
        {label: 'PURCHASE ORDER', value: 'PURCHASE ORDER'},
        {label: 'PURCHASE RECEIPT', value: 'PURCHASE RECEIPT'},
        {label: 'PURCHASE RETURN', value: 'PURCHASE RETURN'},
        {label: 'PURCHASE INVOICE', value: 'PURCHASE INVOICE'}
        // {label: 'PURCHASE PICKUP', value: 'PURCHASE PICKUP'},
      ]
    }
    const mapData = this.props.mapData
    const bounds = new this.props.google.maps.LatLngBounds()
    for (let i = 0; i < mapData.length; i++) {
      bounds.extend({ lat: Number(mapData[i].XX10C_GEOY_0), lng: Number(mapData[i].XX10C_GEOX_0) })
    }
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Choose Site & Date</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md='4' lg='3'>
                <FormGroup>
                  <Label for='site'>Site <span className="text-danger">*</span></Label>
                  <Select
                    id='site'
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    name='site'
                    placeholder='Select Site'
                    options={siteOptions}
                    isClearable
                    value={siteOptions.filter((site) => site.value === this.state.selectedSite)}
                    onChange={event => this.setState({ selectedSite: event ? event.value : '' })}
                  />
                </FormGroup>
              </Col>
              <Col md='4' lg='3'>
                <FormGroup>
                  <Label for='docType'>Document Type <span className='text-danger'>*</span></Label>
                  <Select
                    id='docType'
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    name='doc_type'
                    placeholder='Select Document Type'
                    options={docTypes}
                    isClearable
                    value={docTypes.filter((doc) => doc.value === this.state.docType)}
                    onChange={event => this.setState({ docType: event ? event.value : '' })}
                  />
                </FormGroup>
              </Col>
              <Col md='4' lg='4' className='d-flex'>
                <FormGroup className='mr-1'>
                  <Label for='fromDate'>From Date</Label>
                  <Flatpickr
                    value={this.state.fromDate}
                    id='fromDate'
                    className='form-control mr-1'
                    placeholder='From Date'
                    onChange={date => this.setState({ fromDate: date[0] })}
                    options={{
                      dateFormat: 'm-d-Y',
                      maxDate: this.state.toDate ? this.state.toDate : new Date()
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='toDate'>To Date</Label>
                  <Flatpickr
                    value={this.state.toDate}
                    id='toDate'
                    className='form-control mr-1'
                    placeholder='To Date'
                    onChange={date => this.setState({ toDate: date[0] })}
                    options={{
                      dateFormat: 'm-d-Y',
                      minDate: this.state.fromDate,
                      maxDate: new Date()
                    }}
                  />
                </FormGroup>
              </Col>
              {/* <Col md='4' lg='3'>
                <FormGroup>
                  <Label for='startDate'>Date Range</Label>
                  <Flatpickr className='form-control' placeholder="Select Date" value={this.state.pickerDate} onChange={date => this.setState({ pickerDate: date })} id='startDate' options={{
                  mode: 'range',
                  dateFormat: 'd-M-Y'
                }} />
                </FormGroup>
              </Col> */}
              <Col md='4' lg='2' className="d-flex align-items-end">
                <FormGroup>
                  <Button.Ripple className='mr-1' color='primary' type='submit' onClick={this.onFilterData}>
                    Submit
                  </Button.Ripple>
                  <Button.Ripple outline color='secondary' type='reset' onClick={this.onResetFilter}>
                    Reset
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div
              id="gmaps-markers"
              className="gmaps"
              style={{ position: "relative" }}
            >
              <Map
                google={this.props.google}
                // onClick={this.onMapClicked}
                style={{ width: "100%", height: "100%" }}
                zoom={8}
                initialCenter={{ 
                  lat: 46.2276,
                  lng: 2.2137
                 }}
                bounds={bounds}
              >
                {mapData.map((res, index) => {
                  const pinIcon = {
                    url: pinSuccess,
                    anchor: new google.maps.Point(32, 32),
                    scaledSize: new google.maps.Size(32, 32)
                  }
                  switch (res.DOCTYP) {
                    case 'DELIVERY':
                      pinIcon.url = pinSuccess
                      break
                    case 'PICK TICKET':
                      pinIcon.url = pinInfo
                      break
                    case 'SALES RETURN':
                      pinIcon.url = pinDanger
                      break
                    case 'PURCHASE RETURN':
                      pinIcon.url = pinWarning
                      break
                    case 'PURCHASE PICKUP':
                      pinIcon.url = pinPrimary
                      break
                    case 'PURCHASE INVOICE':
                      pinIcon.url = pinDanger
                      break
                    case 'PURCHASE RECEIPT':
                      pinIcon.url = pinSuccess
                      break
                    case 'SALES INVOICE':
                      pinIcon.url = pinInfo
                      break
                  }
                  return (
                    <Marker
                      key={index}
                      onClick={this.onMarkerClick}
                      data={res}
                      position={{ lat: res.XX10C_GEOY_0, lng: res.XX10C_GEOX_0 }}
                      icon={pinIcon}
                    />
                  )
                })}
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                >
                  <div>
                    <h3>{this.state.selectedPlace.DOCTYP}</h3>
                    <p><b>Num: </b>
                      {this.state.selectedPlace.SDHNUM_0}
                      {this.state.selectedPlace.SOHNUM_0}
                      {this.state.selectedPlace.POHNUM_0}
                      {this.state.selectedPlace.PRHNUM_0}
                      {this.state.selectedPlace.SRHNUM_0}
                      {this.state.selectedPlace.PNHNUM_0}
                      {this.state.selectedPlace.XPTHNUM_0}
                      {this.state.selectedPlace.XODRNUM_0}
                      {this.state.selectedPlace.PTHNUM_0}
                      {this.state.selectedPlace.NUM_0}
                    </p>
                    <p>
                      <b>Customer: </b>
                      {this.state.selectedPlace.BPCORD_0}
                      {this.state.selectedPlace.BPSNUM_0}
                      {this.state.selectedPlace.XBPSNUM_0}
                      {this.state.selectedPlace.BPR_0}
                    </p>
                    <p><b>Name: </b> 
                      {this.state.selectedPlace.BPCNAM_0}
                      {this.state.selectedPlace.BPSNAM_0}
                      {this.state.selectedPlace.BPONAM_0}
                      {this.state.selectedPlace.BPRNAM_0}
                    </p>
                    <p><b>Date: </b>
                      {this.state.selectedPlace.DLVDAT_0 ? <Moment format="MM/DD/YYYY">{this.state.selectedPlace.DLVDAT_0}</Moment> : ''}
                      {this.state.selectedPlace.RTNDAT_0 ? <Moment format="MM/DD/YYYY">{this.state.selectedPlace.RTNDAT_0}</Moment> : ''}
                      {this.state.selectedPlace.XRCPDAT_0 ? <Moment format="MM/DD/YYYY">{this.state.selectedPlace.XRCPDAT_0}</Moment> : ''}
                      {this.state.selectedPlace.ORDDAT_0 ? <Moment format="MM/DD/YYYY">{this.state.selectedPlace.ORDDAT_0}</Moment> : ''}
                      {this.state.selectedPlace.RCPDAT_0 ? <Moment format="MM/DD/YYYY">{this.state.selectedPlace.RCPDAT_0}</Moment> : ''}
                      {this.state.selectedPlace.ACCDAT_0 ? <Moment format="MM/DD/YYYY">{this.state.selectedPlace.ACCDAT_0}</Moment> : ''}
                    </p>
                    <p><b>Site: </b>
                      {this.state.selectedPlace.SALFCY_0}
                      {this.state.selectedPlace.STOFCY_0}
                      {this.state.selectedPlace.PNHFCY_0}
                      {this.state.selectedPlace.XPRHFCY_0}
                      {this.state.selectedPlace.POHFCY_0}
                      {this.state.selectedPlace.PRHFCY_0}
                      {this.state.selectedPlace.FCY_0}
                    </p>
                  </div>
                </InfoWindow>
              </Map>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  sites: state.sites,
  mapData: state.mapData
})

const mapDispatchToProps = {
  retrieveSites,
  retrieveMapData
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: "AIzaSyAQb-7NDLDsJh-l3siJQ_1gEw2lBgWKYlU",
    v: "3"
  })(MapsGoogle))
