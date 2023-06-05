// ** React Imports
import { useEffect, useState } from 'react'

import { Row, Col, Card, CardBody, Table, CardTitle, CardHeader } from 'reactstrap'
import { isUserLoggedIn } from '@utils'

const ProfileComponent = () => {
  // ** State
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  return (
    <div className="w-100">
      <Row>
        <Col>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Profile</CardTitle>
            </CardHeader>
            <CardBody>
              { userData ? (
              <div>
                <h3 className="text-primary mt-2">Personal Information</h3>
                <hr className='mt-0' />
                <Table bordered>
                  <tbody>
                    <tr>
                      <th width="200px">User</th>
                      <td>{userData.XNAME_0}</td>
                    </tr>
                    {/* <tr>
                      <th width="200px">Role</th>
                      <td>{userData.XDESC_0}</td>
                    </tr>
                    <tr>
                      <th width="200px">Email</th>
                      <td>{userData.XMAIL_0}</td>
                    </tr> */}
                    <tr>
                      <th width="200px">Account</th>
                      <td>{userData.X3USER_0}</td>
                    </tr>
                    <tr>
                      <th width="200px">Login ID</th>
                      <td>{userData.XLOGIN_0}</td>
                    </tr>
                    {userData.X3ROLE_0 !== 4 ? (
                    <tr>
                      <th width="200px">Site Tax ID No.</th>
                      <td>{userData.CRN_0}</td>
                    </tr>
                    ) : ''}
                    {userData.X3ROLE_0 !== 4 ? (
                    <tr>
                      <th width="200px">EU VAT No.</th>
                      <td>{userData.EECNUM_0}</td>
                    </tr>
                    ) : ''}
                    {userData.X3ROLE_0 !== 4 ? (
                    <tr>
                      <th width="200px">SIC Code</th>
                      <td>{userData.NAF_0}</td>
                    </tr>
                    ) : ''}
                    {/* <tr>
                      <th width="200px">Phone</th>
                      <td>{userData.XPHONE_0}</td>
                    </tr> */}
                  </tbody>
                </Table>
              </div>
              ) : '' }
              { userData && userData.Addresses.length > 0 ? (
              <div>
                <h3 className="text-primary mt-3">Address Information</h3>
                <hr className='mt-0' />
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th className='no-wrap'>Code</th>
                      <th className='no-wrap'>Description</th>
                      <th className='no-wrap'>Address 1</th>
                      <th className='no-wrap'>Address 2</th>
                      <th className='no-wrap'>Address 3</th>
                      <th className='no-wrap'>Postal Code</th>
                      <th className='no-wrap'>City</th>
                      <th className='no-wrap'>Country</th>
                      <th className='no-wrap'>Is Default Address?</th>
                      <th className='no-wrap'>Telephone</th>
                      <th className='no-wrap'>Mobile</th>
                      <th className='no-wrap'>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    { userData.Addresses.map((address, index) => {
                      return (
                        <tr key={index}>
                          <td className='no-wrap'>{address.BPAADD_0}</td>
                          <td className='no-wrap'>{address.BPADES_0}</td>
                          <td className='no-wrap'>{address.BPAADDLIG_0}</td>
                          <td className='no-wrap'>{address.BPAADDLIG_1}</td>
                          <td className='no-wrap'>{address.BPAADDLIG_2}</td>
                          <td className='no-wrap'>{address.POSCOD_0}</td>
                          <td className='no-wrap'>{address.CTY_0}</td>
                          <td className='no-wrap'>{address.CRY_0}</td>
                          <td className='no-wrap'>{address.BPAADDFLG_0 === 2 ? "Yes" : "No"}</td>
                          <td className='no-wrap'>{address.TEL_0}</td>
                          <td className='no-wrap'>{address.MOB_0}</td>
                          <td className='no-wrap'>{address.WEB_0}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
              ) : '' }
              { userData && userData.Contacts.length > 0 ? (
              <div>
                <h3 className="text-primary mt-3">Contact Information</h3>
                <hr className='mt-0' />
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th className='no-wrap'>Contact Code</th>
                      <th className='no-wrap'>First Name</th>
                      <th className='no-wrap'>Last Name</th>
                      <th className='no-wrap'>Telephone</th>
                      <th className='no-wrap'>Mobile</th>
                      <th className='no-wrap'>Language</th>
                    </tr>
                  </thead>
                  <tbody>
                    { userData.Contacts.map((contact, index) => {
                      return (
                        <tr key={index}>
                          <td className='no-wrap'>{contact.CCNCRM_0}</td>
                          <td className='no-wrap'>{contact.CNTFNA_0}</td>
                          <td className='no-wrap'>{contact.CNTLNA_0}</td>
                          <td className='no-wrap'>{contact.TEL_0}</td>
                          <td className='no-wrap'>{contact.MOB_0}</td>
                          <td className='no-wrap'>{contact.LAN_0}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
              ) : '' }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProfileComponent
