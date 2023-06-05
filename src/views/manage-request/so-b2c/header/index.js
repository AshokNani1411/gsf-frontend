
import {Menu} from 'antd'

function SalesOrderCreateHeader() {

    return (<div className="soheader">
             <Menu
             style={{ backgroundColor : "#217f69", color : "white" }}
             mode = "horizontal"
                 items = {[
                 {
                     label : "FACTR",
                     key: "FACTR"
                 },
                   {
                                      label : "EQUIP",
                                      key: "EQUIP",
                                      children : [
                                      {
                                            label : 'TRAIL',
                                            key: 'TRAIL'
                                      }
                                      ]
                                  },
                    {
                                       label : "GAMME",
                                       key: "GAMME"
                                   }
                 ]}
             />
    </div>)
}
export default SalesOrderCreateHeader