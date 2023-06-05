// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Third Party Components
import wNumb from 'wnumb'
import classnames from 'classnames'
import { Star } from 'react-feather'
import Nouislider from 'nouislider-react'
import { Card, CardBody, Row, Col, CustomInput, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'

const Sidebar = props => {
  // ** Props
  const { sidebarOpen } = props

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL()
  const [priceRange, setPriceRange] = "All"
  const [category, setCategory] = ''

  // ** Array of categories
  const categories = [
    {
      id: 'appliances',
      title: 'Appliances',
      defaultChecked: true
    },
    {
      id: 'audio',
      title: 'Audio'
    },
    {
      id: 'camera-camcorders',
      title: 'Camera & Camcorders'
    },
    {
      id: 'car-electronics',
      title: 'Car Electronics & Gps'
    },
    {
      id: 'cellphones',
      title: 'Cell Phones'
    },
    {
      id: 'computers',
      title: 'Computers & Tablets'
    },
    {
      id: 'health-fitness-beauty',
      title: 'Health, Fitness & Beauty'
    },
    {
      id: 'office-school',
      title: 'Office & School Supplies'
    },
    {
      id: 'tv-home-theater',
      title: 'TV & Home Theater'
    },
    {
      id: 'video-games',
      title: 'Video Games'
    }
  ]

  // ** Array of brands
  const brands = [
    {
      title: 'Insignia™',
      total: 746
    },
    {
      title: 'Samsung',
      total: 633,
      checked: true
    },
    {
      title: 'Metra',
      total: 591
    },
    {
      title: 'HP',
      total: 530
    },
    {
      title: 'Apple',
      total: 422,
      checked: true
    },
    {
      title: 'GE',
      total: 394
    },
    {
      title: 'Sony',
      total: 350
    },
    {
      title: 'Incipio',
      total: 320
    },
    {
      title: 'KitchenAid',
      total: 318
    },
    {
      title: 'Whirlpool',
      total: 298
    }
  ]

  // ** Array of ratings
  const ratings = [
    {
      ratings: 4,
      total: 160
    },
    {
      ratings: 3,
      total: 176
    },
    {
      ratings: 2,
      total: 291
    },
    {
      ratings: 1,
      total: 190
    }
  ]

   const handleChange = (event)  => {
     console.log("Hangle change =", event)
      console.log("Hangle change =", event.target.id)
        console.log("Hangle change =", event.target.value)
       // setCategory(event.target.id)
       props.onProdCategChange(event.target.id)

    }


  return (
    <div className='sidebar-detached sidebar-left'>
      <div className='sidebar'>
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen
          })}
        >
          <Row>
            <Col sm='12'>
              <h6 className='filter-heading d-none d-lg-block'>Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div id='product-categories'>
                <h6 className='filter-title'>Categories</h6>
                <ul className='list-unstyled categories-list'>
                  {props.ProdcutCateg.map(category => {
                    return (
                      <li key={category.id}>
                        <CustomInput
                          type='radio'
                          id={category.TCLCOD_0}
                          label={category.TEXTE_0}
                          name='category-radio'
                          defaultChecked={category.defaultChecked}
                           onChange={handleChange}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div id='clear-filters'>
                <Button.Ripple color='primary' block>
                  Clear All Filters
                </Button.Ripple>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
