from django.urls import path
from sales.views import SaleStatisticsView, SaleList, GetAllUserSales, SaleRetrieveUpdateDestroyAPIView, SaveCSVFile

urlpatterns = [
    path('upload_file/', SaveCSVFile.as_view()),
    path("sale_statistics/", SaleStatisticsView.as_view(), name="sale_statistics"),
    path('sales/', SaleList.as_view(), name='sale-list'),
    path('user_sales/', GetAllUserSales.as_view(), name='user_sales_list'),
]
