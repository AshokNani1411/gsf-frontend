import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import DiscussionForumService from "../../services/DiscussionForumService"
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, Input, InputGroup, Row } from 'reactstrap'
import '@styles/base/pages/app-chat.scss'
import '@styles/base/pages/app-chat-list.scss'
import { Send } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classnames from 'classnames'
import moment from 'moment'

const PodDetail = (props) => {
  const [msg, setMsg] = useState('')
  const [discussionForum, setDiscussionForum] = useState(null)
  const userData = JSON.parse(localStorage.getItem('userData'))
  const chatArea = useRef(null)

  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current)
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
  }

  const getDiscussionForumDetail = id => {
    DiscussionForumService.get(id)
      .then(response => {
        if (response && response.data) {
          setDiscussionForum(response.data)
          scrollToBottom()
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const forumId = props.match.params.id
    if (forumId) {
      getDiscussionForumDetail(forumId)
    }
  }, [])

  const handleSendMsg = e => {
    e.preventDefault()
    if (msg.length) {
      const data = {
        forumId: discussionForum.X10CFORUMID_0,
        senderId: userData.X3USER_0,
        message: msg
      }
      DiscussionForumService.sendMessage(data)
      .then(response => {
        if (response && response.success) {
          discussionForum.messages.push({
            ROWID: 1,
            X10CMSGTXT_0: msg,
            X10CSENDID_0: userData.X3USER_0,
            X10CSENTDATT_0: "Jan 13 2023 12:00AM"
          })
          setMsg('')
          scrollToBottom()
        }
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  const renderChats = () => {
    return discussionForum.messages.map((item, index) => {
      return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.X10CSENDID_0 !== userData.X3USER_0
          })}
        >
          {/* <div className='chat-avatar'>
            <Avatar
              className='box-shadow-1 cursor-pointer'
              img={item.senderId === userData.X3USER_0 ? userProfile.avatar : selectedUser.contact.avatar}
            />
          </div> */}

          <div className='chat-body'>
            <div className='chat-content'>
              <div className='d-flex justify-content-between align-items-center' style={{ minWidth: '220px' }}>
                <p className={classnames('font-weight-bold', {'text-primary': item.X10CSENDID_0 !== userData.X3USER_0})}>{item.X10CSENDID_0}</p>
                <small className={classnames({'text-primary': item.X10CSENDID_0 !== userData.X3USER_0})}>{moment(item.CREDATTIM_0).format('MM/DD/YYYY hh:mm A')}</small>
              </div>
              <p style={{ whiteSpace: 'pre-wrap' }}>{item.X10CMSGTXT_0}</p>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          { discussionForum ? (
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4' className="mb-0">{discussionForum.X10CTITLE_0}</CardTitle>
                <Button type='button' color='secondary' outline tag={Link} to='/discussion-forum'>Back</Button>
              </CardHeader>
              <CardBody>
              <div className='chat-app-window'>
                <PerfectScrollbar ref={chatArea} className='user-chats' options={{ wheelPropagation: false }}>
                  <div className='chats' style={{ height: "64vh" }}>{renderChats()}</div>
                </PerfectScrollbar>
                <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
                  <Input
                    value={msg}
                    type='textarea'
                    className='mr-1'
                    rows='1'
                    onChange={e => setMsg(e.target.value)}
                    placeholder='Type your message...'
                  />
                  <Button className='send' color='primary'>
                    <Send size={14} className='d-lg-none' />
                    <span className='d-none d-lg-block'>Send</span>
                  </Button>
                </Form>
              </div>
              </CardBody>
            </Card>
          ) : ''}
        </Col>
      </Row>
    </div>
  )
}

export default PodDetail