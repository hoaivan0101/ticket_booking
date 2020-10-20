/**
 * Created by trungquandev.com's author on 18/02/2020.
 * emailController.js
 */
const mailer = require('../utils/mailer');

const sendMail = async (req, res) => {
  try {
    const {to, subject, body} = req.body;
    await mailer.sendMail(to, subject, body);

    res.send('<h3>Thanks for your suggestions</h3>');
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  sendMail: sendMail,
};
