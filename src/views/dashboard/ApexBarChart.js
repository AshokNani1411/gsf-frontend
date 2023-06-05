import Chart from 'react-apexcharts'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const ApexBarChart = ({chartData}) => {
  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      colors: ['#fff']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: chartData.labels
    },

    yaxis: [
      {
        labels: {
          formatter: function(val) {
            return val.toFixed(0)
          }
        }
      }
    ]
  }

  return (
    <Card>
      {/* <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>
        <CardTitle className='font-weight-bolder' tag='h4'>
          Sales Orders
        </CardTitle>
      </CardHeader> */}
      <CardBody>
        <Chart options={options} series={chartData.series} type='bar' height={400} />
      </CardBody>
    </Card>
  )
}

export default ApexBarChart
