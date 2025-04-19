from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from api.models import Cart, CartItem, ProductVariant, User
from api.serializers import CartItemSerializer, CartSerializer

class CartService:
    def add_item_to_cart(self, user_id, data):
        # Get the user by ID (admin user in this case)
        user = get_object_or_404(User, id=user_id)
        # Get or create cart for the user
        cart, created = Cart.objects.get_or_create(user=user)
        product_variant = get_object_or_404(ProductVariant, id=data.get('product_variant_id'))
        quantity = int(data.get('quantity', 0))

        if quantity <= 0:
            return Response({"error": "Quantity must be greater than 0"}, status=status.HTTP_400_BAD_REQUEST)

        if product_variant.stock_quantity < quantity:
            return Response({"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product_variant=product_variant,
            defaults={'quantity': quantity, 'price_at_addition': product_variant.price}
        )

        if not created:
            cart_item.quantity += quantity
            if cart_item.quantity > product_variant.stock_quantity:
                return Response({"error": "Total quantity exceeds stock"}, status=status.HTTP_400_BAD_REQUEST)
            cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_cart(self, user_id):
        user = get_object_or_404(User, id=user_id)
        cart = get_object_or_404(Cart, user=user)
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)