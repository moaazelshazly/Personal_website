import type { ActionFunctionArgs } from 'react-router';

export async function contactAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  // const subject = formData.get('subject')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

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

  // Simulate network latency / dispatching email
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    name,
    message: 'Your message was transmitted successfully. I will get back to you shortly!'
  };
}
