from datetime import datetime
from pydantic import BaseModel

from django.db.models import Sum
from rest_framework import generics
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Sale
from .serializers.SaleSerializer import SaleStatisticsSerializer, SaleSerializer, FileUploadSerializer


class SaleData(BaseModel):
    date: datetime
    product: str
    sales_number: int
    revenue: float


class SaleList(generics.ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


class SaleRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

class GetAllUserSales(generics.ListAPIView):
    serializer_class = SaleSerializer

    def get_queryset(self):
        user = self.request.user
        return Sale.objects.filter(user=user)



class SaveCSVFile(generics.CreateAPIView):
    parser_class = (FileUploadParser,)
    serializer_class = FileUploadSerializer

    def post(self, request, *args, **kwargs):
        file_obj = request.data.get('file')
        file_content = file_obj.read().decode('utf-8')
        data = file_content.split('\r\n')
        header = data[0].split(',')
        if header != ['date', 'product', 'sales_number', 'revenue']:
            return Response({'error': "Headers should be: 'date', 'product', 'sales_number', 'revenue'"})
        sales = []
        for string in data[1:-1]:
            string = string.split(',')
            sale = SaleData(
                date=datetime.strptime(string[0], '%Y-%m-%d'),
                product=string[1],
                sales_number=int(string[2]),
                revenue=float(string[3]),
            )
            sales.append(sale)
        for sale in sales:
            Sale.objects.create(date=sale.date,
                product=sale.product,
                sales_number=sale.sales_number,
                revenue=sale.revenue,
                user=request.user)


        return Response({'status': 'File saved successfully'})


@permission_classes([IsAuthenticated])
class SaleStatisticsView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        user = self.request.user

        # Calculate average sales for the current user
        try:
            user_sales = Sale.objects.filter(user=user)
            total_revenue = user_sales.aggregate(Sum('revenue'))['revenue__sum']
            average_sales_for_user = total_revenue / user_sales.count() if user_sales.count() else 0

            # Calculate average sales for all users
            all_sales = Sale.objects.all()
            total_revenue_all_sales = sum([sale.revenue * sale.sales_number for sale in all_sales])
            total_sales_number = all_sales.aggregate(Sum('sales_number'))['sales_number__sum']
            average_sale_all_user = total_revenue_all_sales / total_sales_number

            # Get the highest revenue sale for the current user
            highest_revenue_sale_for_user = user_sales.order_by('-revenue').first()

            # Get the product with the highest revenue for the current user
            product_highest_revenue_for_user = user_sales.values('product').annotate(
                total_revenue=Sum('revenue')
            ).order_by('-total_revenue').first()

            # Get the product with the highest number of sales for the current user
            product_highest_sales_number_for_user = user_sales.values('product').annotate(
                total_sales=Sum('sales_number')
            ).order_by('-total_sales').first()
            statistics = {
                "average_sales_for_current_user": average_sales_for_user,
                "average_sale_all_user": average_sale_all_user,
                "highest_revenue_sale_for_current_user": {
                    "sale_id": highest_revenue_sale_for_user.id,
                    "revenue": highest_revenue_sale_for_user.revenue
                },
                "product_highest_revenue_for_current_user": {
                    "product_name": product_highest_revenue_for_user['product'],
                    "price": product_highest_revenue_for_user['total_revenue']
                },
                "product_highest_sales_number_for_current_user": {
                    "product_name": product_highest_sales_number_for_user['product'],
                    "price": product_highest_sales_number_for_user['total_sales']
                }
            }
            serializer = SaleStatisticsSerializer(statistics)
            return Response(serializer.data)
        except Exception:
            return Response({"message": "no sales data"})
