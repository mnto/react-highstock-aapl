import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      open: "",
      close: "",
      data: []
    }
  }

  componentWillMount() {
    // fetch data
    fetch('https://www.quandl.com/api/v3/datasets/WIKI/aapl.json?column_index=11&api_key=r5fvLAYy1Hs5_tn2qQTR')
      .then(response => {
        return response.json();
      }).then(resp => {
        // console.log(resp);
        var open = resp['dataset']['start_date'];
        var close = resp['dataset']['end_date'];
        var data = resp['dataset']['data'].reverse();
        data = data.map(item => [new Date(item[0]).getTime(), item[1]]);

        this.setState({
          open,
          close,
          data
        });
      })
  }

    render() {

      var config = {
        rangeSelector: {
          selected: 0
        },
        title: {
          text: 'AAPL Historical Data'
        },
        series: [
          {
            name: 'AAPL',
            data: this.state.data,
            tooltip: {
              valueDecimals: 2
            }
          }
        ]
      };
      return (
        <ReactHighstock config = {config} />
      )

    }
}
