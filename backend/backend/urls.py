"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
# from baseresponse.urls import product_urls
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/update/', include('baseupdate.urls')),
    # path('api/', include('baseresponse.urls')),
    path('api/products/', include('baseresponse.urls.product_urls')),
    path('api/users/', include('baseresponse.urls.user_urls')),
    path('api/order/', include('baseresponse.urls.order_urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_URL)

