from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .services.product_service import ProductService
from .services.cart_service import CartService
from .services.order_service import OrderService

# Browse Products (Public)
class ProductListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        service = ProductService()
        return service.get_product_list()

# Add Item to Cart (MVP: No Authentication, Hardcode Admin User)
class AddItemToCartView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        admin_user_id = 1 
        service = CartService()
        return service.add_item_to_cart(admin_user_id, request.data)

# View Cart (MVP: No Authentication, Hardcode Admin User)
class ViewCartView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        admin_user_id = 1
        service = CartService()
        return service.get_cart(admin_user_id)

# Place Order (Left unchanged for now; can be updated similarly)
class PlaceOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        customer_name = request.data.get('customer_name')
        service = OrderService()
        return service.place_order(request.user, customer_name)