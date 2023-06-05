import { Link } from "react-router-dom"
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from "reactstrap"
import "@styles/base/pages/page-auth.scss"
import { ChevronLeft } from "react-feather"

const ForgotPassword = () => {

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
            <CardTitle tag="h2" className="font-weight-bold mb-1">
            Forgot Password? 🔒
            </CardTitle>
            <CardText className="mb-2">
            Enter your email and we'll send you instructions to reset your password
            </CardText>
            <Form
              className="auth-forgot-password-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <FormGroup>
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  placeholder="john@example.com"
                  autoFocus
                />
              </FormGroup>
              <Button.Ripple tag={Link} to="/reset-password" color="primary" block>
                Send reset link
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/login'>
                <ChevronLeft className='mr-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPassword
