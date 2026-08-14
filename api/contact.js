import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { name, email, phone, message, consent } = req.body

  // Validation
  if (!name || !email || !phone || !consent) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' })
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid email address' })
  }

  try {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    })

    // Email to client (receipt)
    const clientEmailBody = `
Hello ${name},

Thank you for reaching out to Glowin Medspa. We've received your message and will get back to you shortly.

---

Your submission:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message || '(no message)'}
Consent: Yes, I agree to receive SMS or e-mails
Date: ${timestamp}

---

Best regards,
Glowin Medspa Team
    `.trim()

    // Email to Glowin (notification)
    const businessEmailBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message || '(no message)'}
Consent (SMS/Email): Yes
Date: ${timestamp}

---
From: ${email}
    `.trim()

    // Send receipt to client
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'We received your message — Glowin Medspa',
      text: clientEmailBody,
    })

    // Send notification to Glowin
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission — Glowin Medspa`,
      text: businessEmailBody,
    })

    return res.status(200).json({
      success: true,
      message: "We've received your message and will follow up shortly.",
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    })
  }
}
