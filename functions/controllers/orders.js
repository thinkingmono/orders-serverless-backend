const axios = require('axios');
const url = `https://tottoqa.vtexcommercestable.com.br/api/oms/pvt/orders`

const getOrderInformation = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-VTEX-API-AppKey": process.env.VTEX_API_APPKEY,
        "X-VTEX-API-AppToken": process.env.VTEX_API_APPTOKEN
      }
    });
    const data = response.data;
    const { orderId, status, value, salesChannel, creationDate, items, clientProfileData: { firstName, lastName, documentType, document } } = data;
    let date = new Date(creationDate).toISOString().split('T')[0];
    let total = parseFloat(value) / 100;
    res.status(200).json({ orderId, status, total, salesChannel, creationDate: date, items, firstName, lastName, documentType, document });
  } catch (error) {
    console.log(error);
    if (error.response.status === 404) res.status(404).json('Order not found');
    if (error.response.status === 401) res.status(401).json('Forbidden');
  }
}

module.exports = { getOrderInformation };