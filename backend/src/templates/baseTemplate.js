/** @format */

const baseTemplate = ({
  title,
  greeting,
  subtitle,
  otp,
  footer,
  headerColor = "#F97316",
  otpBackground = "#FFF7ED",
  otpColor = "#EA580C",
  icon = "📧",
}) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>${title}</title>
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
  style="background:#f8fafc;padding:40px 20px;"
>

<tr>

<td align="center">

<table
  width="600"
  cellpadding="0"
  cellspacing="0"
  style="
    width:100%;
    max-width:600px;
    background:#ffffff;
    border-radius:20px;
    overflow:hidden;
    box-shadow:0 10px 35px rgba(15,23,42,.08);
  "
>

<!-- ================= Header ================= -->

<tr>

<td
  style="
    background:${headerColor};
    padding:36px;
    text-align:center;
    color:#ffffff;
  "
>

<div
  style="
    font-size:44px;
    margin-bottom:12px;
  "
>
${icon}
</div>

<h1
  style="
    margin:0;
    font-size:30px;
    font-weight:700;
  "
>
Revision Tracker
</h1>

<p
  style="
    margin:10px 0 0;
    font-size:15px;
    opacity:.95;
  "
>
Study Smarter • Revise Better
</p>

</td>

</tr>

<!-- ================= Content ================= -->

<tr>

<td
  style="
    padding:40px;
  "
>

<h2
  style="
    margin:0;
    font-size:28px;
    color:#0f172a;
  "
>
${title}
</h2>

<p
  style="
    margin:20px 0 0;
    font-size:16px;
    color:#0f172a;
    font-weight:600;
  "
>
${greeting}
</p>

<p
  style="
    margin:14px 0 0;
    font-size:16px;
    line-height:30px;
    color:#475569;
  "
>
${subtitle}
</p>

<!-- OTP Box -->

<div
  style="
    margin:36px 0;
    padding:24px;
    background:${otpBackground};
    border-radius:18px;
    text-align:center;
  "
>

<div
  style="
    font-size:42px;
    font-weight:700;
    letter-spacing:12px;
    color:${otpColor};
  "
>
${otp}
</div>

<p
  style="
    margin:14px 0 0;
    font-size:14px;
    color:#64748b;
  "
>
⏳ Valid for 10 minutes
</p>

</div>

<!-- Security Notice -->

<div
  style="
    background:#f8fafc;
    border-left:4px solid ${headerColor};
    border-radius:14px;
    padding:18px 20px;
  "
>

<h3
  style="
    margin:0 0 10px;
    color:#0f172a;
    font-size:16px;
  "
>
🔒 Security Notice
</h3>

<p
  style="
    margin:0;
    font-size:15px;
    line-height:28px;
    color:#475569;
  "
>
${footer}
</p>

</div>

</td>

</tr>

<!-- ================= Footer ================= -->

<tr>

<td
  style="
    background:#f8fafc;
    padding:28px;
    text-align:center;
    border-top:1px solid #e2e8f0;
  "
>

<p
  style="
    margin:0;
    font-size:14px;
    color:#64748b;
  "
>
Need help?

</p>

<p
  style="
    margin:8px 0 18px;
    font-size:14px;
    color:${headerColor};
    font-weight:600;
  "
>
support@revisiontracker.com
</p>

<p
  style="
    margin:0;
    font-size:13px;
    color:#94a3b8;
  "
>
© ${new Date().getFullYear()} Revision Tracker

<br/>

Study Smarter • Revise Better

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

module.exports = baseTemplate;
