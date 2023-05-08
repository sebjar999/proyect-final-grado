from django.core.mail import send_mail

def send_email_test(
    _subject,
    _message,
    _from_email,
    _recipient_list,
    _fail_silently = False,
):
    send_mail(
        subject=_subject,
        message=_message,
        from_email=_from_email,
        recipient_list=_recipient_list,
        fail_silently=_fail_silently,
    )