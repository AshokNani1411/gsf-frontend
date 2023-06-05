import axios from 'axios'
import API from '@configs/API'

const getAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/drop-requests`, data)
}

const get = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/drop-requests/${id}`)
}

const create = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-drop-request`, data)
}

const remove = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/drop-requests/delete`, data)
}

//cart
const getSOCartAll = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/socart-requests`, data)
}

const createSOCart = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-socart-request`, data)
}

const removeSOCart = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/socart-requests/delete`, data)
}

//soap service to Create b2c order
const getAllPrice =  (data) => {

 console.log("Inside price service -", data)
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.open('POST', 'https://tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC', true)

// eslint-disable-next-line prefer-template
const src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>' +
        '<poolAlias xsi:type="xsd:string">DEMOTMSFR</poolAlias>' +
         '<poolId xsi:type="xsd:string"></poolId>' +
        ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
     ' </callContext>' +
      '<publicName xsi:type="xsd:string">X10CSOHCRE</publicName>' +

      '  <inputXml xsi:type="xsd:string">' +
     '<![CDATA[<PARAM>' +
   '<FLD NAME="I_XBPCNUM" TYPE="Char">' + data.customer + '</FLD>' +
   '<FLD NAME="I_XFCY" TYPE="Char">' + data.usersite + '</FLD>' +
   '<FLD NAME="I_XORDDAT" TYPE="Date">' + data.date + '</FLD>' +
   '</PARAM>]]>' +
   '</inputXml>' +
   '</wss:run>' +
'</soapenv:Body>' +
'</soapenv:Envelope>'



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return
      }
    if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            const responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML
            console.log("soap xample =", responeData)
            const extractxmldata = responeData.slice(9, responeData.length - 3)
            console.log("soap xample extractxmldata=", extractxmldata)
          const xml = new XMLParser().parseFromString(extractxmldata)
       //  const completeResult = return xml;

          console.log("soap xample inside service", xml)
          const PO =  xml.children[1].children[1]
          const ResultantData = xml.children[1].children
          console.log("soap PO", PO)
          console.log("soap PreReceipt =", ResultantData)
           console.log("soap PreReceipt length =", ResultantData.length)
         //  let s = 0
         const finalArray = []

          for (let s = 0; s < ResultantData.length; s++) {
            console.log("Inner side Object 1", ResultantData[s])
             const tempobj = {}
             const innerResultant = ResultantData[s].children
             console.log("Inner side sub object 1", innerResultant)
             for (let s1 = 0; s1 < innerResultant.length; s1++) {
                 const   tname = innerResultant[s1].attributes.NAME
                   const tvalue = innerResultant[s1].value
                  tempobj[tname] = tvalue

                console.log("final sub object 1", tempobj)
              }
                console.log("final sub object 2", tempobj)
             finalArray.push(tempobj)

          }

        console.log("final Array", finalArray)




          resolve(finalArray)

        }

    }
}


xmlhttp.setRequestHeader('Content-Type', 'text/html')

xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC')
// eslint-disable-next-line prefer-template
xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TESTUSER" + ':' + "TU@123*"))

try {
xmlhttp.send(src)
} catch (error) {
    console.log(error)
}
  })
}






const DropRequestService = {
  getAll,
  get,
  create,
  remove,
  getSOCartAll,
  createSOCart,
  removeSOCart

}

export default DropRequestService