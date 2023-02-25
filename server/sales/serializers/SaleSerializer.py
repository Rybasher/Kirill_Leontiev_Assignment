from rest_framework import serializers

from sales.models import Sale


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ('id', 'product', 'revenue', 'sales_number', 'date', 'user')


class SaleStatisticsSerializer(serializers.Serializer):
    average_sales_for_current_user = serializers.DecimalField(max_digits=10, decimal_places=2)
    average_sale_all_user = serializers.DecimalField(max_digits=10, decimal_places=2)
    highest_revenue_sale_for_current_user = serializers.DictField()
    product_highest_revenue_for_current_user = serializers.DictField()
    product_highest_sales_number_for_current_user = serializers.DictField()
