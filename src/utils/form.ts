export async function submitContactForm(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): Promise<{ success: boolean; message: string; isMailto?: boolean }> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  const fallbackEmail = import.meta.env.VITE_CONTACT_EMAIL || 'info@tline.ie';

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      return { success: true, message: 'Thank you! We\'ll be in touch soon.' };
    } catch (error) {
      console.error('Form submission error:', error);
      // Fall back to mailto
      return mailtoFallback(data, fallbackEmail);
    }
  } else {
    return mailtoFallback(data, fallbackEmail);
  }
}

function mailtoFallback(
  data: {
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  },
  email: string
) {
  const subject = encodeURIComponent(`New Lead Submission: ${data.name} - ${data.service}`);
  const body = encodeURIComponent(
    `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone}\nService Interest: ${data.service}\n\nMessage:\n${data.message}`
  );

  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

  return {
    success: true,
    message: 'Your email client is opening. If it doesn\'t launch, please contact us directly at ' + email,
    isMailto: true,
  };
}
