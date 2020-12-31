import DragSelect from 'dragselect';

let ds;

Highcharts.chart('container', {
  chart: {
    type: 'column',
    events: {
      render: () => {
        setTimeout(initDragSelect, 1000);
      }
    }
  },
  title: {
    text: 'Stacked column chart'
  },
  xAxis: {
    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Total fruit consumption'
    },
    stackLabels: {
      enabled: true,
      style: {
        fontWeight: 'bold',
        color: ( // theme
          Highcharts.defaultOptions.title.style &&
          Highcharts.defaultOptions.title.style.color
        ) || 'gray'
      }
    }
  },
  legend: {
    align: 'right',
    x: -30,
    verticalAlign: 'top',
    y: 25,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || 'white',
    borderColor: '#CCC',
    borderWidth: 1,
    shadow: false
  },
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: true
      },
      allowPointSelect: true,
    }
  },
  series: [{
    name: 'John',
    data: [5, 3, 4, 7, 2]
  }, {
    name: 'Jane',
    data: [2, 2, 3, 2, 1]
  }, {
    name: 'Joe',
    data: [3, 4, 4, 2, 5]
  }]
});

function initDragSelect() {
  if (ds) {
    ds.stop();
  }
  const area = document.querySelector('#container');
  const selectables = document.getElementsByClassName('highcharts-point');
  ds = new DragSelect({
    area,
    selectables,
    customStyles: false,
    onDragStart: function (element) {
      // console.log('drag start');
    },
    onDragMove: function (element) {
      // console.log('drag move');
    },
    onElementSelect: function (element) {
      console.log('element selected', element);
    },
  });
}