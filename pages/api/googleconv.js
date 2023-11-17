import axios from "axios"

export default async function handler(req, res) {
  const crypto = "BTC"

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://www.google.com/complete/search?q&cp=0&client=gws-wiz-serp&xssi=t&gs_pcrt=2&hl=en-IL&authuser=0&pq=btc%20to%20dollar&psi=6aFWZe2BFv6sxc8PlOi08Ag.1700176360914&dpr=0.8999999761581421",
  }

  axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data))
      console.log(response.data.substring(3))

      // const item = response.data.substring(3)[0][1]
      // const firstNum = item[1].toString()
      // const secondNum = item[2][0].toString()
      // const thirdNum = item[2][1].toString()
      // const data = `${firstNum}${secondNum}.${thirdNum}`

      // return res.status(200).json(data)
      return res.status(200).json(response.data.substring(3))
    })
    .catch((error) => {
      return res.status(500).json(error.message)
    })
}
