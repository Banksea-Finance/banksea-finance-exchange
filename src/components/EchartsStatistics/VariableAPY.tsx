import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'

const VariableAPY: React.FC = () => {
  const data =  [
    [
      'Jun 17',
      130
    ],
    [
      'Jun 18',
      150
    ],
    [
      'Jun 19',
      180
    ],
    [
      'Jun 20',
      210
    ],
    [
      'Jun 21',
      230
    ],
    [
      'Jun 22',
      255
    ],
    [
      'Jun 23',
      365
    ],
    [
      'Jun 24',
      412
    ],
    [
      'Jun 25',
      475
    ],
    [
      'Jun 26',
      500
    ],
    [
      'Jun 27',
      528
    ],
    [
      'Jun 28',
      559
    ],
    [
      'Jun 29',
      601
    ],
    [
      'Jun 30',
      621
    ],
    [
      'Jul 01',
      688
    ],
    [
      'Jul 02',
      700
    ],
    [
      'Jul 03',
      728
    ],
    [
      'Jul 04',
      749
    ],
    [
      'Jul 05',
      750
    ],
    [
      'Jul 06',
      759
    ],
    [
      'Jul 07',
      802
    ],
    [
      'Jul 08',
      822
    ],
    [
      'Jul 09',
      830
    ],
    [
      'Jul 10',
      837
    ],
    [
      'Jul 11',
      849
    ],
    [
      'Jul 12',
      862
    ],
    [
      'Jul 13',
      893
    ],
    [
      'Jul 14',
      933
    ]
  ]

  const dateList = data?.map(function (item: any[]) {
    return item[0]
  })

  const valueList = data?.map(function (item: any[]) {
    return item[1]
  })

  const [ops, setOps] = useState<any>()

  useEffect(() => {
    setOps({
      // Make gradient line here
      visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: dateList,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ffffff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        }
      },
      yAxis: {
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ffffff'
          }
        }
      },
      grid: { top: '54', bottom: '40', left: '44', right: '44'  },
      series: [{
        type: 'line',
        showSymbol: false,
        data: valueList
      }]
    })
  }, [])

  return ops ? <ReactECharts option={ops} style={{ width: '100%', height: 180, }} /> : <div />
}

export default VariableAPY
