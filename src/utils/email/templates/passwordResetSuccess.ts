function passwordResetSuccess (name: string) {
  return `
     <!doctype html>
     <html>
        <head>
            <style>
            </style>
        </head>
        <body>
            <p>Hi ${name},</p>
            <p> Your password has been reset successfully.</p>
        </body>
    </html>
     `
};

export { passwordResetSuccess }
