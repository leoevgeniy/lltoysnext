from django.urls import path
from baseresponse.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="product-create"),
    path('createfeed/', views.createyml, name="createyml"),
    path('catalog/', views.getCatalog, name="product-createCatalog"),
    path('migrate/', views.migrateProduct, name="product-migrate"),
    path('migrate/update', views.updateStock, name="product-migrate"),
    path('updatenew30/', views.updateNewBestsellers, name="product-new30"),
    path('createyml', views.createyml, name="product-migrate"),

    path('supersale/', views.updateBySuperSaleProduct, name="product-super-sale"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('top/', views.getTopProducts, name="top-products"),
    path('top', views.getTopProducts, name="top-products"),
    path('seen', views.getSeenProducts, name="seen-products"),
    # path('<str:pk>', views.getProduct, name="product"),
    path('category/<str:pk>', views.getCategotyProducts, name="getCatalogProducts"),
    path('<str:pk>', views.getProduct, name="product"),
    path('<str:pk>/reviews/', views.createProductReview, name="product-review"),



    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
]
