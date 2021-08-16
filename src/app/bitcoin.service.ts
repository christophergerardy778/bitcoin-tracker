import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  private readonly URL = "https://api.coingecko.com/api/v3/coins"

  constructor(private http: HttpClient) {
  }

  getBitcoinCurrentPrice() {
    return this.http
      .get<any>(`${this.URL}/bitcoin`, {
        params: {
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false
        }
      });
  }

  getBitcoinPrice() {
    return this.http
      .get<any>(`${this.URL}/bitcoin/market_chart`, {
        params: {
          vs_currency: "usd",
          days: 7,
          interval: "daily"
        }
      });
  }
}
