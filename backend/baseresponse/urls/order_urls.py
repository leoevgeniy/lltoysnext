from django.urls import path
from baseresponse.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('add', views.addOrderItems, name='orders-add'),
    path('p5s/', views.addP5sOrder, name='p5s-orders-add'),
    path('p5sdetails/<str:pk>', views.getP5sOrderDetails, name='p5s-orders-details'),
    path('myorders/', views.getMyOrders, name='myorders'),
    path('myorders', views.getMyOrders, name='myorders'),

    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),
    path('<str:pk>/', views.getOrderByID, name='user-orders'),
    path('<str:pk>/paymentrequest/', views.PaymentRequest, name='payment-request'),
    path('<str:pk>/paymentdetails/', views.PaymentDetails, name='payment-request'),
]
