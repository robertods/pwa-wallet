import { html, useGlobalState, navigate } from '../../vendor/framework.js'
import Layaout from '../../layouts/wallet-layout.js'
import PageSelector from '../../components/PageSelector.js'
import OperationList from '../../components/OperationList.js'
import '../../vendor/lit-highchart.bundle.min.js'

export default function() {

  const [balance] = useGlobalState('balance')

  const chartOptions = {
    chart: {
      height: 200
    },
    title: {
      text: '$',
      align: 'center',
      verticalAlign: 'middle'
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        dataLabels: false,
        size: '100%'
      }
    },
    series: [{
      type: 'pie',
      innerSize: '50%',
      data: []
    }],
    credits: false
  }

  return Layaout(html`
    ${PageSelector()}
    <h1>$ ${balance}</h1>
    <div class="position-relative">
      <highcharts-chart .options=${chartOptions}></highcharts-chart>
      <button type="button" class="btn btn-info itx-floating" @click=${e => navigate('/income/new')}>
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
    ${OperationList([])}
  `);

}
