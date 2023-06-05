// ** React Imports// ** Third Party Components
import React, { useState, useEffect } from "react"
import Select from 'react-select'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, CardBody, Form, FormGroup } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import { retrieveCustomers } from "../../redux/actions/customer"
import { retrieveSuppliers } from "../../redux/actions/supplier"
import { retrieveSites } from "../../redux/actions/site"
import UserDataService from "../../services/UserService"

// ** Utils
import { selectThemeColors } from '@utils'
import { Link } from 'react-router-dom'

const CreateUserComponent = (props) => {
  const customers = useSelector(state => state.customers)
  const suppliers = useSelector(state => state.suppliers)
  const sites = useSelector(state => state.sites)
  const roleOptions = [
    {value: 2, label: 'Customer'},
    {value: 3, label: 'Supplier'},
    {value: 4, label: 'Admin'}
  ]
  const supplierOptions = suppliers.map(s => {
    return {value: s.BPSNUM_0, label: `${s.BPSNUM_0} (${s.BPSNAM_0})`}
  })
  const customerOptions = customers.map(c => {
    return {value: c.BPCNUM_0, label: `${c.BPCNUM_0} (${c.BPCNAM_0})`}
  })
  const siteOptions = sites.map(c => {
    return {value: c.FCY_0, label: `${c.FCY_0} (${c.FCYNAM_0})`}
  })
  const dispatch = useDispatch()

  const initialUserState = {
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    site: '',
    concode: '',
    x3user: '',
    xlogin: ''
  }
  const [user, setUser] = useState(initialUserState)

  const getUserDetail = id => {
    UserDataService.get(id)
      .then(response => {
        setUser({
          id: response.data.XCONCODE_0,
          concode: response.data.XCONCODE_0,
          name: response.data.XNAME_0,
          email: response.data.XMAIL_0,
          password: response.data.XPSWD_0,
          phone: response.data.XPHONE_0,
          role: response.data.X3ROLE_0,
          site: response.data.X3SITE_0,
          x3user: response.data.X3USER_0,
          xlogin: response.data.XLOGIN_0
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const userId = props.match.params.id
    if (userId) {
      getUserDetail(userId)
    }
    dispatch(retrieveCustomers())
    dispatch(retrieveSuppliers())
    dispatch(retrieveSites())
  }, [])

  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between">
      <CardTitle tag='h4' className="mb-0">USER DETAILS</CardTitle>
      <Button type='button' color='secondary' outline tag={Link} to='/admin/users'>Back</Button>
      </div>
      <Row>
        <Col sm='12'>
          <Form className="auth-login-form mt-2">
            <Card>
              <CardBody className="pt-1">
                <Row>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='role'>Role</Label>
                      <Select
                        id='role'
                        theme={selectThemeColors}
                        classNamePrefix='select'
                        name='role'
                        placeholder='Select Role'
                        options={roleOptions}
                        value={roleOptions.filter((role) => role.value === user.role)}
                        className='react-select'
                        isDisabled={true}
                      />
                    </FormGroup>
                  </Col>
                  { user.role !== 4 ? (
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='x3user'>{user.role === 2 ? 'Customer' : 'Supplier'}</Label>
                      <Select
                        id='x3user'
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        name='x3user'
                        placeholder='Select User'
                        options={user.role === 2 ? customerOptions : supplierOptions}
                        value={user.role === 2 ? customerOptions.filter((customer) => customer.value === user.x3user) : supplierOptions.filter((supplier) => supplier.value === user.x3user)}
                        className='react-select'
                        isDisabled={true}
                      />
                    </FormGroup>
                  </Col>
                  ) : ''}
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='contact'>Contact Code</Label>
                      <Input
                        name='concode'
                        id='concode'
                        value={user.concode}
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="pt-1">
                <Row>
                  { user.role !== 4 ? (
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='site'>Site</Label>
                      <Select
                        id='site'
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        name='site'
                        placeholder='Select Site'
                        options={siteOptions}
                        value={siteOptions.filter((site) => site.value === user.site)}
                        className='react-select'
                        isDisabled={true}
                      />
                    </FormGroup>
                  </Col>
                  ) : ''}
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='xlogin'>Login ID <span className='text-danger'></span></Label>
                      <Input
                        name='xlogin'
                        id='xlogin'
                        value={user.xlogin}
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='password'>Password</Label>
                      <Input
                        type='password'
                        name='password'
                        id='password'
                        value={user.password}
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='name'>Full Name</Label>
                      <Input
                        name='name'
                        id='name'
                        value={user.name}
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="pt-1">
                <Row>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='email'>Email</Label>
                      <Input
                        name='email'
                        id='email'
                        value={user.email}
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='phone'>Phone</Label>
                      <Input
                        name='phone'
                        id='phone'
                        value={user.phone}
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default CreateUserComponent
