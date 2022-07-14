function emailVerification (baseUrl: string, token: string, name: string) {
  return `
     <!doctype html>
     <html>
      <head>
          <style>
          </style>
      </head>
      <body>
          <p>Hi ${name},</p>
          <p>Kindly verify your email.</p>
          <p> Please, click the link below to Verify your email</p>
          <a href="${baseUrl}/v1/auth/verify/${token}">Verify Email</a>
      </body>
    </html>
     `
};

export { emailVerification }
