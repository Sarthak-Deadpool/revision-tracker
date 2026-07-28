const verificationEmail = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background:#f8fafc;
          font-family:Arial,Helvetica,sans-serif;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="padding:40px 0;"
        >
          <tr>
            <td align="center">

              <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                style="
                  background:#ffffff;
                  border-radius:10px;
                  padding:40px;
                "
              >

                <tr>
                  <td align="center">
                    <h1 style="color:#f97316;">
                      Revision Tracker
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h2>Hello ${name},</h2>

                    <p>
                      Thank you for registering with Revision Tracker.
                    </p>

                    <p>
                      Please use the following OTP to verify your email address.
                    </p>

                    <div
                      style="
                        font-size:32px;
                        font-weight:bold;
                        letter-spacing:10px;
                        text-align:center;
                        color:#f97316;
                        margin:30px 0;
                      "
                    >
                      ${otp}
                    </div>

                    <p>
                      This OTP is valid for
                      <strong>10 minutes</strong>.
                    </p>

                    <p>
                      If you didn't create this account,
                      you can safely ignore this email.
                    </p>

                    <br/>

                    <p>
                      Regards,<br/>
                      Revision Tracker Team
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

module.exports = verificationEmail;