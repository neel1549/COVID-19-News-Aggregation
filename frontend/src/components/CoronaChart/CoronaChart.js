import React from "react";
import { Line } from "react-chartjs-2";

export default class CoronaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      cases: [],
      chartData: {},
      done: false,
      deaths: [],
    };
  }

  dataParse() {
    for (var i = 0; i < this.props.data.length; i += 2) {
      if (this.props.data[i].data.length > 0) {
        var currentDate = new Date(this.props.data[i].timeStamp);
        currentDate.setHours(0, 0, 0, 0);
        const match = this.state.dates.find(
          (d) => d.getTime() === currentDate.getTime()
        );
        const hasMatch = !!match;
        if (hasMatch == false) {
          this.state.dates.push(currentDate);
          for (var j = 0; j < this.props.data[i].data.length; j++) {
            if (
              this.props.data[i].data[j].county === this.props.selectedCounty
            ) {
              this.state.cases.push(this.props.data[i].data[j].case);
              this.state.deaths.push(this.props.data[i].data[j].death);
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    this.dataParse();
    this.chartCreate();
  }

  chartCreate() {
    this.setState({
      chartData: {
        labels: this.state.dates.map(
          (d) => d.getUTCMonth() + 1 + "/" + d.getUTCDate()
        ),
        datasets: [
          {
            label: "COVID 19 Cases in " + this.props.selectedCounty,
            data: this.state.cases,
            backgroundColor: ["#fdb353"],
          },
        ],
      },
      done: true,
    });
  }
  render() {
    if (this.state.done) {
      return (
        <div>
          <div
            className="Chart-Wraper"
            style={{
              border: "1px solid grey",
              background: "white",
              opacity: 0.7,
            }}
          >
            <div className="Chart">
              <Line
                data={this.state.chartData}
                width={150}
                height={500}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
          <div
            className="jumbotron"
            style={{
              border: "1px solid grey",
              background: "white",
              opacity: 0.7,
            }}
          >
            <div class="ui statistics">
              <div class="statistic">
                <div class="value">
                  {this.state.cases[this.state.cases.length - 1]}
                </div>
                <div class="label">Cases</div>
              </div>
              <div class="statistic">
                <div class="value">
                  {this.state.deaths[this.state.deaths.length - 1]}
                </div>
                <div class="label">Deaths</div>
              </div>
              <div class="statistic">
                <div class="value">
                  {(
                    ((this.state.cases[this.state.cases.length - 1] -
                      this.state.cases[this.state.cases.length - 8]) /
                      this.state.cases[this.state.cases.length - 8]) *
                    100
                  ).toFixed(2)}
                </div>
                <div class="label">% Increase from Last Week</div>
              </div>

              <div class="statistic">
                <div class="value">
                  {(
                    (
                      this.state.cases[this.state.cases.length - 1] /
                      this.state.cases[this.state.cases.length - 8]
                    ).toFixed(2) * this.state.cases[this.state.cases.length - 1]
                  ).toFixed(0)}
                </div>
                <div class="label">Projected Cases Next Week</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}
