import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';


class Chart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: {
                labels: ['HE`s','Folgas','FNC','HE`s NC', 'HE`s FM'],
                datasets: [{
                    label: ['Quantidade'],
                    data: [7,5,2,1,2],
                    backgroundColor: [
                        'rgba(39,174,96,0.7)',
                        'rgba(230,126,34,0.7)',
                        'rgba(41,128,185,0.7)',
                        'rgba(201,76,60,0.7)',
                        'rgba(128,128,128,0.6)'
                    ]
                }]
            }
        }
    } 

    render(){
        return(
            <Bar data={this.state.chartData}
                 options={{
                    maintainAspectRatio: true,
                    scales: {
                        yAxes: [{
                          ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 10
                          }    
                        }]
                      }
                 }} 
            />
        )
    }
}
export default Chart;