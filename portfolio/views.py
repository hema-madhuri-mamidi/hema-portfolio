import os

from django.contrib import messages
from django.core.mail import BadHeaderError
from django.shortcuts import redirect, render

from .forms import ContactForm
from utils.email_service import send_email


def home(request):
    form = ContactForm(request.POST or None)

    if request.method == 'POST' and form.is_valid():
        subject = f'Portfolio contact from {form.cleaned_data["name"]}'
        body = (
            f'New message from your portfolio contact form:\n\n'
            f'Name: {form.cleaned_data["name"]}\n'
            f'Email: {form.cleaned_data["email"]}\n\n'
            f'Message:\n{form.cleaned_data["message"]}'
        )
        try:
            recipient = os.getenv('EMAIL_HOST_USER')
            if not recipient or not send_email(recipient, subject, body):
                raise Exception('Email service failed.')
        except BadHeaderError:
            messages.error(request, 'Invalid header found. Please try again.')
        # except Exception:
        #     messages.error(request, 'Sorry, your message could not be sent right now. Please try again later.')
        except Exception as e:
            print("EMAIL ERROR:", e)
            messages.error(request, f"EMAIL ERROR: {e}")
        else:
            messages.success(request, 'Thank you! Your message was sent successfully.')
            return redirect(request.path + '#contact')

    return render(request, 'portfolio/index.html', {'form': form})

