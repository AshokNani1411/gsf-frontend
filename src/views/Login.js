import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { debounce } from 'lodash'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  Button
} from 'reactstrap'

import axios from 'axios'
import API from '@configs/API'
import '@styles/base/pages/page-auth.scss'
import { AlertTriangle, Coffee } from 'react-feather'
import temaLogo from '@src/assets/images/logo/tema-logo.png'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in!</span>
    </div>
  </Fragment>
)

const ErrorContent = (message) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<AlertTriangle size={12} />} />
        <h6 className='toast-title font-weight-bold'>Error!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

const Login = () => {
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')

  const { register, errors, handleSubmit } = useForm()


  const onSubmit = data => {
    if (isObjEmpty(errors)) {
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, { id :code, password}).then(res => {
        console.log("After login call", res)
        if (res && res.data && res.success) {
          const data = { ...res.data.user, accessToken: res.data.token, refreshToken: null }
          dispatch(handleLogin(data))
          history.push(getHomeRouteForLoggedInUser(data.XDESC_0))
          window.location.reload()
          toast.success(
            <ToastContent name={data.XNAME_0} role={data.XDESC_0} />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        } else {
          toast.error(
            ErrorContent(res.message),
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-block auth-left" lg="8" sm="12">
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <img src={temaLogo} style={{ width: '180px', marginBottom: '24px' }}></img>
            <CardTitle tag="h3" className="font-weight-bold mb-1">
              Welcome to Business Portal for X3
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className="form-label" for="login-code">
                  <h4>Login ID</h4>
                </Label>
                <Input
                  type='text'
                  value={code}
                  id='login-code'
                  name='login-code'
                  placeholder='XXXXXX'
                  onChange={e => setCode(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-code'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              {/* <FormGroup>
                <Label className="form-label" for="customer">
                  Customer
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={customer}
                  id='customer'
                  name='customer'
                  placeholder='XXXXXX'
                  readOnly
                  className={classnames({ 'is-invalid': errors['customer'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup> */}
              <FormGroup>
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    <h4>Password</h4>
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <Button.Ripple type='submit' color='primary' block>
                Sign in
              </Button.Ripple>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
