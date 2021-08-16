import {Component} from '@angular/core';
import {Label} from "ng2-charts";
import {ChartDataSets, ChartOptions} from "chart.js";
import {BitcoinService} from "./bitcoin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private bitcoinService: BitcoinService) {
    this.bitcoinService.getBitcoinPrice()
      .subscribe(data => {
        data.prices.forEach((item: any) => {
          this.lineChartData[0].data!.push(item[1]);
          this.labels.push(this.toDate(item[0]));
        });
      });

    this.bitcoinService.getBitcoinCurrentPrice()
      .subscribe(data => {
        const {current_price, price_change_percentage_1h_in_currency} = data.market_data;
        this.currentPrice = current_price.usd;
        this.currentChange = Number.parseFloat(price_change_percentage_1h_in_currency.usd.toFixed(2));
      });
  }

  currentPrice = 0;
  currentChange = 0;

  labels: Label[] = [];

  lineChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: "rgba(15, 52, 96, 0.4)",
      borderColor: "#0F3460",
      pointBackgroundColor: "#FFFFFF"
    }
  ];

  lineChartOptions: ChartOptions = {
    responsive: true,

    legend: {
      display: false
    },

    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    },
  };

  toDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toDateString();
  }
}
