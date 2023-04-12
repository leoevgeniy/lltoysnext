from django.urls import path
from baseupdate.views import migrateProduct, updateStock

urlpatterns = [
    path('migrate/', migrateProduct, name="product-migrate"),
    path('update/', updateStock, name="product-stock-update"),

]