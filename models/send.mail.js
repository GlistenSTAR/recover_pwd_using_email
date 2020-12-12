const mailjet = require ('node-mailjet').connect('8244e719835365d03f77058ca7dfcc10', '9860cba58b6a7028465a15875825e174');

module.exports = async (to, content) => {
  const subject = content.Subject;
  const text = content.TextPart;
  const html = content.HTMLPart;
  const task =content.TextPart;
  await mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "www0327333@gmail.com",
          "Name": "Expert Ivnest Team"
        },
        "To": [
          {
            "Email": to,
            "Name": "ttt"
          }
        ],
        "Subject": subject,
        "TextPart": text,
        "HTMLPart": html,
        "CustomID": task
      }
    ]
  })
}