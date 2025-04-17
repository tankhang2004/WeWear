from rest_framework import serializers
from .models import Products, Brands

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brands
        fields = ['id', 'name', 'description', 'logo_url']

class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()

    class Meta:
        model = Products
        fields = ['id', 'name', 'description', 'category', 'base_price', 'created_at', 'updated_at', 'brand']
