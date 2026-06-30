import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      source = 'website',
      name,
      email,
      company = '',
      phone = '',
      service = '',
      challenge = '',
      message = '',
      timeline = ''
    } = data;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }

    const messageOrChallenge = message || challenge;

    // 1. Send to Google Sheets Webhook
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const webhookSecret = process.env.WEBHOOK_SECRET || '';
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: webhookSecret,
            source,
            name,
            email,
            company,
            phone,
            service,
            message: messageOrChallenge,
            timeline,
            submittedAt: new Date().toISOString()
          }),
        });

        if (!response.ok) {
          console.error('Google Sheets webhook HTTP error:', response.status, await response.text());
        } else {
          const resData = await response.json().catch(() => null);
          if (resData && !resData.success) {
            console.error('Google Sheets Webhook rejected request:', resData.error);
          }
        }
      } catch (webhookError) {
        console.error('Error sending to Google Sheets webhook network request:', webhookError);
      }
    } else {
      console.warn('GOOGLE_SHEETS_WEBHOOK_URL is not defined in environment variables.');
    }

    // 2. Send Email via Brevo API
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (brevoApiKey) {

      const escapeHtml = (val: string) => {
        return (val || "")
          .toString()
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      };

      const safe = {
        source: escapeHtml(source),
        name: escapeHtml(name),
        email: escapeHtml(email),
        company: escapeHtml(company || "-"),
        phone: escapeHtml(phone || "-"),
        service: escapeHtml(service || "-"),
        timeline: escapeHtml(timeline || "-"),
        message: escapeHtml(messageOrChallenge || "-").replace(/\n/g, "<br />")
      };

      const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        /* Gmail iOS Dark Mode text color inversion fix */
        u + .body .gmail-blend-screen {
          background: #000000 !important;
          mix-blend-mode: screen !important;
        }
        u + .body .gmail-blend-difference {
          background: #000000 !important;
          mix-blend-mode: difference !important;
        }
      </style>
    </head>
    <body class="body" style="margin:0;padding:0;background:#f6f2ec;font-family:Arial,sans-serif;color:#1f2933;">
      <div style="max-width:720px;margin:0 auto;padding:28px 16px;">

        <div style="background:#ffffff;border-radius:22px;overflow:hidden;border:1px solid #e5ded5;box-shadow:0 10px 30px rgba(0,0,0,0.06);">

          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td bgcolor="#0F172A" style="background-color:#0F172A;background-image:linear-gradient(135deg,#0F172A 0%,#1B2335 100%);padding:26px 30px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="vertical-align:middle;padding-left:10px;">
                      <p style="margin:0 0 7px;font-size:12px;text-transform:uppercase;letter-spacing:2.4px;color:#F4A340;font-weight:800;">
                        Fractional CMO
                      </p>
                      <span class="gmail-blend-screen" style="display:inline-block;">
                        <span class="gmail-blend-difference" style="display:inline-block;">
                          <span style="color:#ffffff !important;font-size:25px;line-height:1.25;font-weight:bold;display:inline-block;">
                            New Lead Submission
                          </span>
                        </span>
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <div style="padding:26px 30px;">
            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4b5563;">
              A new lead has been submitted from the website (${safe.source}).
            </p>

            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="width:190px;padding:13px 12px;border-bottom:1px solid #eeeeee;color:#6b7280;font-weight:700;">Name</td>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#111827;">${safe.name}</td>
              </tr>

              <tr>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#6b7280;font-weight:700;">Email</td>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#111827;">
                  <a href="mailto:${safe.email}" style="color:#0F172A;text-decoration:none;font-weight:600;">${safe.email}</a>
                </td>
              </tr>

              <tr>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#6b7280;font-weight:700;">Phone</td>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#111827;">
                  <a href="tel:${safe.phone}" style="color:#111827;text-decoration:none;">${safe.phone}</a>
                </td>
              </tr>

              <tr>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#6b7280;font-weight:700;">Company</td>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#111827;">${safe.company}</td>
              </tr>
              
              <tr>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#6b7280;font-weight:700;">Service Interest</td>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#111827;">${safe.service}</td>
              </tr>
              
              <tr>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#6b7280;font-weight:700;">Timeline</td>
                <td style="padding:13px 12px;border-bottom:1px solid #eeeeee;color:#111827;">${safe.timeline}</td>
              </tr>

              <tr>
                <td style="padding:13px 12px;color:#6b7280;font-weight:700;">Message/Challenge</td>
                <td style="padding:13px 12px;color:#111827;line-height:1.6;">${safe.message}</td>
              </tr>
            </table>

            <div style="margin-top:24px;padding:16px 18px;background:#F7F3EA;border-radius:14px;border:1px solid #E7D8C4;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;">
                Reply directly to this email to contact ${safe.name}.
              </p>
            </div>
          </div>

        </div>
      </div>
    </body>
    </html>
      `;

      // Environment variables with fallbacks to defaults
      const emailFrom = process.env.BREVO_SENDER_EMAIL || 'dev@dsigns.com.au';
      const emailFromName = process.env.BREVO_SENDER_NAME || 'Fractional CMO';
      const primaryRecipient = process.env.BREVO_PRIMARY_RECIPIENT || 'basheer@dsigns.com.au';

      // Parse BCC recipients from comma-separated string, or use default array
      let bccRecipients = ['akshay@dsigns.com.au'];
      const bccEnv = process.env.BREVO_BCC_RECIPIENTS;
      if (bccEnv) {
        bccRecipients = bccEnv.split(',').map((e: string) => e.trim()).filter(Boolean);
      }

      // Only add cc property if there are recipients
      const emailPayload: any = {
        sender: {
          name: emailFromName,
          email: emailFrom
        },
        to: [
          { email: primaryRecipient }
        ],
        replyTo: {
          email: safe.email,
          name: safe.name
        },
        subject: `New Lead Submission from ${name} (${source})`,
        htmlContent: htmlContent
      };

      if (bccRecipients.length > 0) {
        emailPayload.bcc = bccRecipients.map(bccEmail => ({ email: bccEmail }));
      }

      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });

        if (!brevoRes.ok) {
          const errText = await brevoRes.text();
          console.error('Brevo API error:', errText);
        }
      } catch (brevoError) {
        console.error('Error sending Brevo email:', brevoError);
      }
    } else {
      console.warn('BREVO_API_KEY is not defined in environment variables.');
    }

    return NextResponse.json({ success: true, message: 'Lead processed successfully' });
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
