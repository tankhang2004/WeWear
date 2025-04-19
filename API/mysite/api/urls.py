from django.urls import path
from .views import ProductListView, AddItemToCartView, ViewCartView, PlaceOrderView

urlpatterns = [
    # Browse Products
    path('products/', ProductListView.as_view(), name='product-list'),
    
    # Cart Management
    path('carts/items/', AddItemToCartView.as_view(), name='add-item-to-cart'),
    path('carts/', ViewCartView.as_view(), name='view-cart'),
    
    # Order Management
    path('orders/', PlaceOrderView.as_view(), name='place-order'),
]