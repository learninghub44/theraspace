import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(data: {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: 'support@mytherapist.christech.co.ke',
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Resend error:', error)
    throw error
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: 'Verify your TheraSpace account',
      html: `
        <h2>Welcome to TheraSpace</h2>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}">Verify Email</a>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Resend error:', error)
    throw error
  }
}
