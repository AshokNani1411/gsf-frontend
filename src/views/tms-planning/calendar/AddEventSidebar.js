// ** Third Party Components
import { X } from 'react-feather'
import { Modal, ModalHeader, ModalBody, Table, Badge } from 'reactstrap'

// ** Utils
import { isObjEmpty, isUserLoggedIn } from '@utils'
import Moment from 'react-moment'
import { useEffect, useState } from 'react'

const AddEventSidebar = props => {
  // ** Props
  const {
    store,
    open,
    handleAddEventSidebar
  } = props

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  // ** Vars
  const selectedEvent = store.selectedEvent
  const docData = !isObjEmpty(selectedEvent) ? selectedEvent._def.extendedProps : null
  const status = {
    1: { title: 'Scheduled', color: 'light-info' },
    2: { title: 'On the Way', color: 'light-warning' },
    3: { title: 'In-Progress', color: 'light-primary' },
    4: { title: 'Completed', color: 'light-success' },
    5: { title: 'Skipped', color: 'light-secondary' },
    6: { title: 'Re-Scheduled', color: 'light-dark' },
    7: { title: 'Cancelled', color: 'light-danger' },
    8: { title: 'To-Plan', color: 'light-warning' }
  }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  return (
    <Modal
      isOpen={open}
      toggle={handleAddEventSidebar}
      className='sidebar-lg'
      contentClassName='p-0'
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {selectedEvent.title}
        </h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
        { docData ? (
          <Table bordered responsive>
            <tbody>
              <tr>
                <th>Type</th>
                <td>{docData.type}</td>
              </tr>
              <tr>
                <th>Site</th>
                <td>
                  {/* {docData.SALFCY_0}
                  {docData.STOFCY_0}
                  {docData.PNHFCY_0}
                  {docData.XPRHFCY_0}
                  {docData.POHFCY_0}
                  {docData.PRHFCY_0}
                  {docData.FCY_0} */}
                  {userData?.X3SITE_0} ({userData?.FCYNAM_0})
                </td>
              </tr>
              <tr>
                { docData.type === 'Purchase Receipt' ? (
                  <th>Receipt Date</th>
                ) : (docData.type === 'Purchase Invoice' || docData.type === 'Sales Invoice') ? (<th>Invoice Date</th>) : (
                <th>{(docData.type === 'Pickup' || docData.type === 'Purchase Order' || docData.type === 'Purchase Return') ? 'Pickup Date' : 'Delivery Date'}</th>)}
                <td>
                  {docData.SHIDAT_0 ? (<Moment format="MM/DD/YYYY">{docData.SHIDAT_0}</Moment>) : ''}
                  {docData.DLVDAT_0 ? (<Moment format="MM/DD/YYYY">{docData.DLVDAT_0}</Moment>) : ''}
                  {docData.RTNDAT_0 ? (<Moment format="MM/DD/YYYY">{docData.RTNDAT_0}</Moment>) : ''}
                  {docData.XRCPDAT_0 ? (<Moment format="MM/DD/YYYY">{docData.XRCPDAT_0}</Moment>) : ''}
                  {docData.ORDDAT_0 ? (<Moment format="MM/DD/YYYY">{docData.ORDDAT_0}</Moment>) : ''}
                  {docData.RCPDAT_0 ? (<Moment format="MM/DD/YYYY">{docData.RCPDAT_0}</Moment>) : ''}
                  {docData.ACCDAT_0 ? (<Moment format="MM/DD/YYYY">{docData.ACCDAT_0}</Moment>) : ''}
                </td>
              </tr>
              <tr>
                <th>{(docData.type === 'Pickup' || docData.type === 'Purchase Order' || docData.type === 'Purchase Return' || docData.type === 'Purchase Receipt' || docData.type === 'Purchase Invoice') ? 'Supplier Code' : 'Customer Code'}</th>
                <td>
                  {docData.BPCORD_0}
                  {docData.BPSNUM_0}
                  {docData.XBPSNUM_0}
                  {docData.BPR_0}
                </td>
              </tr>
              <tr>
                <th>{(docData.type === 'Pickup' || docData.type === 'Purchase Order' || docData.type === 'Purchase Return' || docData.type === 'Purchase Receipt' || docData.type === 'Purchase Invoice') ? 'Supplier Name' : 'Customer Name'}</th>
                <td>
                  {docData.BPCNAM_0}
                  {docData.BPSNAM_0}
                  {docData.BPRNAM_0}
                  {docData.BPONAM_0}
                </td>
              </tr>
              { docData.type !== 'Purchase Invoice' && docData.type !== 'Sales Invoice' && docData.type !== 'Purchase Receipt' ? (
                <tr>
                <th>Carrier</th>
                <td>
                  {docData.BPTNUM_0} {docData.BPTNAM_0 ? `(${docData.BPTNAM_0})` : ''}
                  {docData.XX10C_BPTNUM_0}
                  {docData.XBPTNUM_0}
                </td>
              </tr>
                ) : <tr></tr> }
              { (docData.type !== 'Purchase Receipt' && docData.type !== 'Purchase Invoice' && docData.type !== 'Sales Invoice') ? (
                <tr>
                  <th>Delivery Method</th>
                  <td>{docData.MDL_0} {docData.MDL_DESC ? `(${docData.MDL_DESC})` : ''}</td>
                </tr>
                ) : <tr></tr> }
              { (docData.type !== 'Sales Invoice') ? (
              <tr>
                <th>Net Weight</th>
                <td>
                  {docData.NETWEI_0} {docData.NETWEI_0 ? docData.WEU_0 : ''}
                  {docData.XX10C_NETWEI_0} {docData.XX10C_WEU_0}
                  {docData.TOTNETWEI_0} {docData.TOTNETWEI_0 ? docData.WEU_0 : ''}
                  {docData.TOTGROWEI_0} {docData.TOTGROWEI_0 ? docData.WEU_0 : ''}
                  {docData.DSPTOTWEI_0} {docData.DSPTOTWEI_0 ? docData.WEU_0 : ''}
                  {docData.XTOTNETWEI_0} {docData.XWEU_0}
                  {docData.TOTLINWEU_0} {docData.DSPWEU_0}
                </td>
              </tr>
              ) : <tr></tr> }
              { (docData.type !== 'Sales Invoice') ? (
              <tr>
                <th>Volume</th>
                <td>
                  {docData.VOL_0} {docData.VOL_0 ? docData.VOU_0 : ''}
                  {docData.XX10C_VOL_0} {docData.XX10C_VOU_0}
                  {docData.TOTVOL_0} {docData.TOTVOL_0 ? docData.VOU_0 : ''}
                  {docData.DSPTOTVOL_0} {docData.DSPTOTVOL_0 ? docData.VOU_0 : ''}
                  {docData.XTOTVOL_0} {docData.XVOU_0}
                  {docData.TOTLINVOU_0} {docData.DSPVOU_0}
                </td>
              </tr>
              ) : <tr></tr> }
              <tr>
                <th>Address Code</th>
                <td>
                  {docData.BPAADD_0}
                  {docData.XBPOADD_0}
                  {docData.BPOADD_0}
                </td>
              </tr>
              <tr>
                <th>Address Line 1</th>
                <td>
                  {docData.BPAADDLIG_0}
                  {docData.BPDADDLIG_0}
                  {docData.XBPOADDLIG_0}
                  {docData.BPOADDLIG_0}
                </td>
              </tr>
              <tr>
                <th>Address Line 2</th>
                <td>
                  {docData.BPDADDLIG_1}
                  {docData.BPAADDLIG_1}
                  {docData.XBPOADDLIG_1}
                  {docData.BPOADDLIG_1}
                </td>
              </tr>
              <tr>
                <th>Address Line 3</th>
                <td>
                  {docData.BPDADDLIG_2}
                  {docData.BPAADDLIG_2}
                  {docData.XBPOADDLIG_2}
                  {docData.BPOADDLIG_2}
                </td>
              </tr>
              <tr>
                <th>Postal Code</th>
                <td>
                  {docData.BPDPOSCOD_0}
                  {docData.XBPOPOSCOD_0}
                  {docData.BPOPOSCOD_0}
                  {docData.POSCOD_0}
                </td>
              </tr>
              <tr>
                <th>City</th>
                <td>
                  {docData.BPDCTY_0}
                  {docData.XBPOCTY_0}
                  {docData.BPOCTY_0}
                  {docData.CTY_0}
                </td>
              </tr>
              <tr>
                <th>Country</th>
                <td>
                  {docData.BPDCRY_0}
                  {docData.XBPOCRY_0}
                  {docData.BPCCRY_0}
                  {docData.BPOCRY_0}
                  {docData.BPOCRYNAM_0}
                  {docData.CRYNAM_0}
                  {docData.BPDCRYNAM_0}
                </td>
              </tr>
              { (docData.type !== "Sales Order" && docData.XDLV_STATUS_0) && (
                <tr>
                  <th>Transportation Status</th>
                  <td>
                    <Badge color={status[docData.XDLV_STATUS_0] && status[docData.XDLV_STATUS_0].color} pill>
                      {status[docData.XDLV_STATUS_0] && status[docData.XDLV_STATUS_0].title}
                    </Badge>
                  </td>
                </tr>) }
            </tbody>
          </Table>
        ) : '' }
      </ModalBody>
    </Modal>
  )
}

export default AddEventSidebar
