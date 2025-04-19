from rest_framework.response import Response
from rest_framework import status
from api.models import Product
from api.serializers import ProductSerializer

class ProductService:
    def get_product_list(self):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)