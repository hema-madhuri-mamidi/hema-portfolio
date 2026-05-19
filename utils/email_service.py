import html
import os

import resend
from resend.emails._emails import Emails


def send_email(to_email, subject, message):
    api_key = os.getenv('RESEND_API_KEY')
    from_email = os.getenv('DEFAULT_FROM_EMAIL')

    if not api_key or not from_email or not to_email:
        return False

    try:
        resend.api_key = api_key

        safe_html = html.escape(message or '')
        safe_html = safe_html.replace('\n', '<br>')
        html_message = (
            '<div style="font-family: Arial, sans-serif; white-space: pre-wrap;">'
            f'{safe_html}'
            '</div>'
        )

        Emails.send(
            {
                'from': from_email,
                'to': [to_email] if isinstance(to_email, str) else to_email,
                'subject': subject,
                'html': html_message,
            }
        )
    except Exception:
        return False

    return True
