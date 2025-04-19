from rest_framework import serializers
from .models import Product, ProductVariant, Cart, CartItem, Order, OrderItem

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'size', 'color', 'price', 'stock_quantity']

class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True, source='productvariant_set')

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'base_price', 'variants']

class CartItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True)
    product_variant_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'cart_id', 'product_variant', 'product_variant_id', 'quantity', 'price_at_addition']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True, source='cartitem_set')

    class Meta:
        model = Cart
        fields = ['id', 'user_id', 'created_at', 'updated_at', 'items']

class OrderItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product_variant', 'quantity', 'price_at_purchase']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True, source='orderitems_set')

    class Meta:
        model = Order
        fields = ['id', 'user_id', 'customer_name', 'total_amount', 'created_at', 'items']