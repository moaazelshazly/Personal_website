import type { ActionFunctionArgs } from 'react-router';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/**
 * Email delivery via FormSubmit (https://formsubmit.co).
 * Works on static hosting (GitHub Pages) — no backend or API key needed.
 * Messages are delivered to PORTFOLIO_DATA.personal.email.
 *
 * NOTE: The very first submission triggers a one-time activation email
 * from FormSubmit to that inbox. Click "Activate Form" once, and every
 * message after that is delivered normally.
 */
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${PORTFOLIO_DATA.personal.email}`;

interface FormSubmitResponse {
  success?: string | boolean;
  message?: string;
}

export async function contactAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const subject = formData.get('subject')?.toString().trim();
  const message = formData.get('message')?.toString().trim();
  const honeypot = formData.get('_honey')?.toString().trim();

  // Spam bots fill hidden fields — pretend success and drop the message
  if (honeypot) {
    return { success: true, name };
  }

  // Validate required fields
  if (!name || !email || !message) {
    return {
      error: 'Please fill in all required fields (Name, Email, Message).'
    };
  }

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      error: 'Please provide a valid email address.'
    };
  }

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject: subject || '(no subject)',
        message,
        _subject: `Portfolio Contact: ${subject || `New message from ${name}`}`,
        _replyto: email,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const result: FormSubmitResponse = await response.json().catch(() => ({}));
    const delivered = response.ok && String(result.success) === 'true';

    if (!delivered) {
      return {
        error:
          result.message ||
          'Message could not be delivered right now. Please email me directly instead.'
      };
    }

    return {
      success: true,
      name,
      message: `Thanks ${name}! Your message was delivered to my inbox. I will get back to you shortly.`
    };
  } catch {
    return {
      error: 'Network error — please check your connection or email me directly.'
    };
  }
}
