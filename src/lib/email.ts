"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const PRIMARY_RECIPIENT = 'basheer@dsigns.com.au';
const CC_RECIPIENTS = ['akshay@dsigns.com.au', 'admin@dsigns.com.au'];

interface StrategyFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  challenge: string;
  revenue?: string;
  timeline?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function sendStrategyFormNotification(formData: StrategyFormData) {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1A2235;">New Strategy Form Submission</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
          ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
          ${formData.phone ? `<p><strong>Phone:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>` : ''}
          ${formData.service ? `<p><strong>Service Interest:</strong> ${formData.service}</p>` : ''}
          ${formData.revenue ? `<p><strong>Revenue:</strong> ${formData.revenue}</p>` : ''}
          ${formData.timeline ? `<p><strong>Timeline:</strong> ${formData.timeline}</p>` : ''}
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #1A2235;">Challenge/Message:</h3>
          <p style="white-space: pre-wrap;">${formData.challenge}</p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated notification from your website form submissions.
        </p>
      </div>
    `;

    const response = await resend.emails.send({
      from: 'noreply@dsigns.com.au',
      to: PRIMARY_RECIPIENT,
      cc: CC_RECIPIENTS,
      subject: `New Strategy Form Submission from ${formData.name}`,
      html,
    });

    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error('Error sending strategy form notification:', error);
    return { success: false, error };
  }
}

export async function sendContactFormNotification(formData: ContactFormData) {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1A2235;">New Contact Form Submission</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
          ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
          ${formData.phone ? `<p><strong>Phone:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>` : ''}
          ${formData.service ? `<p><strong>Service Interest:</strong> ${formData.service}</p>` : ''}
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #1A2235;">Message:</h3>
          <p style="white-space: pre-wrap;">${formData.message}</p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated notification from your website form submissions.
        </p>
      </div>
    `;

    const response = await resend.emails.send({
      from: 'noreply@dsigns.com.au',
      to: PRIMARY_RECIPIENT,
      cc: CC_RECIPIENTS,
      subject: `New Contact Form Submission from ${formData.name}`,
      html,
    });

    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error('Error sending contact form notification:', error);
    return { success: false, error };
  }
}
