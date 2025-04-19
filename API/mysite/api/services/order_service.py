from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from api.models import Cart, CartItem, Order, OrderItem
from api.serializers import OrderSerializer

class OrderService:
    def place_order(self, user, customer_name):
        cart = get_object_or_404(Cart, user=user)
        cart_items = CartItem.objects.filter(cart=cart)

        if not cart_items:
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        for item in cart_items:
            if item.quantity > item.product_variant.stock_quantity:
                return Response({"error": f"Insufficient stock for {item.product_variant}"}, status=status.HTTP_400_BAD_REQUEST)

        total_amount = sum(item.price_at_addition * item.quantity for item in cart_items)

        order_data = {
            'user': user,
            'customer_name': customer_name or user.username,
            'total_amount': total_amount
        }
        
        order = Order.objects.create(**order_data)

        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product_variant=item.product_variant,
                quantity=item.quantity,
                price_at_purchase=item.price_at_addition
            )
            item.product_variant.stock_quantity -= item.quantity
            item.product_variant.save()

        cart_items.delete()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)