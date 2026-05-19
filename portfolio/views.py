from django.conf import settings
from django.contrib import messages
from django.core.mail import BadHeaderError, send_mail
from django.shortcuts import redirect, render

from .forms import ContactForm


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
            print(settings.EMAIL_HOST_USER)
            send_mail(
                subject,
                body,
                settings.DEFAULT_FROM_EMAIL,
                [settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
        except BadHeaderError:
            messages.error(request, 'Invalid header found. Please try again.')
        except Exception:
            messages.error(request, 'Sorry, your message could not be sent right now. Please try again later.')
        else:
            messages.success(request, 'Thank you! Your message was sent successfully.')
            return redirect(request.path + '#contact')

    return render(request, 'portfolio/index.html', {'form': form})

