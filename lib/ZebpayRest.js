'use strict';

const axios = require("axios");

class ZebpayRest {

    baseUrl = 'https://www.zebapi.com/api/v1';

    async makeRequest(path, method, query) {
        try {
            this.headers.timestamp = new Date().getTime();
            let res = await axios({
                method,
                url: this.baseUrl + path,
                headers: this.headers,
                params: query || {}
            });
            return res.data;
        } catch (err) {

        }
    }

    constructor(opts) {
        this.client_id = opts.client_id;
        this.client_secret = opts.client_secret;
        this.api_secret = opts.api_secret;
        this.access_token = opts.access_token;
        this.headers = { client_id: this.client_id, Authorization: 'Bearer ' + this.access_token, 'Content-Type': 'application/json' }
    }

    async account() {
        let res = await this.makeRequest('/wallet/balance');
        return res;
    }

    async orders(trade_pair, opts) {
        if (!opts) opts = {};
        opts.trade_pair = trade_pair;
        let res = await this.makeRequest('/orders', 'get', opts);
        return res;
    }

    async cancelOrder(order_id) {
        let res = await this.makeRequest('/orders/' + order_id);
        return res;
    }

}

module.exports = ZebpayRest; 