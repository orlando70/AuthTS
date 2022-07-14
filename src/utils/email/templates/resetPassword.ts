function resetPassword (baseUrl: string, token: string, name: string) {
  return `
     <!doctype html>
     <html>
        <head>
            <style>
            </style>
        </head>
        <body>
            <p>Hi ${name},</p>
            <p>You requested to reset your password.</p>
            <p> Please, click the link below to reset your password</p>
            <a href="${baseUrl}/v1/auth/reset/${token}">Reset Password</a>
        </body>
    </html>
     `
};

export { resetPassword }
