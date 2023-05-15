import string
import random

def generar_string_aleatorio(longitud=6):
    letras = string.ascii_lowercase + string.ascii_uppercase + string.digits
    return ''.join(random.choice(letras) for i in range(longitud))