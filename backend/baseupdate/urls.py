from django.urls import path
from baseupdate.views import migrateProduct, updateStock, createyml, createsitemap

urlpatterns = [
    path('migrate/', migrateProduct, name="product-migrate"),
    path('update/', updateStock, name="product-stock-update"),
    path('createsitemap/', createsitemap, name="create-sitemap"),
    path('createyml/', createyml, name="create-yml"),
]
