const fs = require('fs');
require('dotenv').config();

const key = process.env.API_KEY; // API Key
const secret = process.env.API_PRIVATE_KEY; // API Private Key
const KrakenClient = require('kraken-api');
const kraken = new KrakenClient(key, secret);

let tries = 1;
let isFinished = false;
const maxTries = 10;

const getDate = () => {
	const dateInstance = new Date();
	const dateString = dateInstance.toLocaleDateString();
	const timeString = dateInstance.toLocaleTimeString();
	return `${dateString} ${timeString}`;
}

const sleep = (ms) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

(async () => {
  while (!isFinished && tries <= maxTries) {
    await sleep(tries * (tries - 1) * 10 * 1000);
    console.log(`[${getDate()}] Try #${tries}`);

    await kraken.api('Ticker', { pair: 'XXBTZEUR' })
      .then(async (res) => {
        const QUANTITY_EUR = Number(process.env.BUY_AMOUNT);
        const PRICE = res['result']['XXBTZEUR']['c'][0];
        const QUANTITY_BTC = Number((QUANTITY_EUR / PRICE).toFixed(8));

        await kraken.api('AddOrder', { pair: 'XXBTZEUR', type: 'buy', ordertype: 'market', volume: QUANTITY_BTC, oflags: 'fcib' })
          .then((res) => {
            console.log(`[${getDate()}] Has been successfully purchased ${QUANTITY_BTC} (${PRICE})`);
            console.log(JSON.stringify(res));
            isFinished = true;
          })
          .catch((err1) => {
            console.log(`[${getDate()}] Error adding the order: ${err1}`);
            tries++;
          })
      })
      .catch((err2) => {
        console.log(`[${getDate()}] Error getting the price: ${err2}`);
        tries++;
      })
  }
})();
