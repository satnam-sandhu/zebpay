'use strict';

const axios = require("axios");

class ZebpayMarket {

    baseUrl = 'https://www.zebapi.com/pro/v1';

    async makeRequest(path, method, query) {
        try {
            let res = await axios({
                method,
                url: this.baseUrl + path
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    constructor() { }

    async ticker(trade_pair) {
        let res = await this.makeRequest(`/market/${trade_pair}/ticker`);
        return res;
    }

}

module.exports = ZebpayMarket; 