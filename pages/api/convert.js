import axios from "axios"

export default async function handler(req, res) {
  const crypto = "BTC"

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC",
    headers: {
      "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_BTC_CURRENCY,
    },
  }

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
      // console.log(response.data["BTC"].quote.USD.price)
      return res.status(200).json(response.data.data["BTC"].quote.USD.price)
    })
    .catch((error) => {
      return res.status(500).json(error.message)
    })
}
