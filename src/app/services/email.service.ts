import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/email.config';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(emailConfig.publicKey);
  }

  async sendContactForm(formData: any): Promise<any> {
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        destination: formData.destination || 'Not specified',
        checkin: formData.startDate || 'Not specified',
        checkout: formData.endDate || 'Not specified',
        travelers: formData.travelers || 'Not specified',
        budget: formData.budget || 'Not specified',
        message: formData.message || 'No additional message',
        to_email: emailConfig.toEmail,
        reply_to: formData.email
      };

      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams
      );

      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw error;
    }
  }
}
