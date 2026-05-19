from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=120,
        required=True,
        error_messages={
            'required': 'Please enter your name.',
        },
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Your Name',
                'class': 'contact-input',
            }
        ),
    )
    email = forms.EmailField(
        required=True,
        error_messages={
            'required': 'Please enter your email address.',
            'invalid': 'Enter a valid email address.',
        },
        widget=forms.EmailInput(
            attrs={
                'placeholder': 'Your Email',
                'class': 'contact-input',
            }
        ),
    )
    message = forms.CharField(
        required=True,
        error_messages={
            'required': 'Please enter your message.',
        },
        widget=forms.Textarea(
            attrs={
                'placeholder': 'Your Message',
                'rows': 6,
                'class': 'contact-textarea',
            }
        ),
    )

    def clean_name(self):
        return self.cleaned_data['name'].strip()

    def clean_message(self):
        return self.cleaned_data['message'].strip()
