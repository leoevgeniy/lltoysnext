# -*- coding: utf-8 -*-
import os, sys
sys.path.insert(0, '/home/l/leoevgrv/backend.lltoys.ru/backend')
sys.path.insert(1, '/home/l/leoevgrv/backend.lltoys.ru/venv_django/lib/python3.8/site-packages')
os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()