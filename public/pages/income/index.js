import { html, getGlobalState, navigate } from '../../vendor/framework.js'
import Layout from '../../layouts/wallet-layout.js'
import PageSelector from '../../components/PageSelector.js'
import OperationList from '../../components/OperationList.js'
import '../../vendor/lit-highchart.bundle.min.js'

export default function() {

  const { balance, income, categories } = getGlobalState()

  const total = income.reduce((t,inc) => t + inc.amount, 0)
  const counters = categories.income.reduce((acc, obj) => ({ ...acc, [obj.id]: 0 }), {})
  income.forEach( g => counters[g.category]++ )
  const data = categories.income.reduce((a, obj) => [ ...a, { 
    name: obj.title,
    y: counters[obj.id], 
    color: obj.color,
  }], [])
  
  const chartOptions = {
    chart: {
      height: 300
    },
    title: {
      text: `$ ${total}`,
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
      innerSize: '70%',
      data
    }],
    credits: false
  }

  return Layout(html`
    ${PageSelector()}
    <h1>$ ${balance}</h1>
    <div class="position-relative">
      <highcharts-chart .options=${chartOptions}></highcharts-chart>
      <button type="button" class="btn btn-info itx-floating" @click=${e => navigate('/income/new')}>
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
    ${OperationList(income)}
  `);

}
