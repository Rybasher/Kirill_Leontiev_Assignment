from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserSettings

from .serializers.userSettingsSerializer import UserSettingsSerializer


class UserListView(generics.ListAPIView):

    queryset = UserSettings.objects.all()
    serializer_class = UserSettingsSerializer


class UserSettingsDetail(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id):
        try:
            obj = UserSettings.objects.get(user_id=id)

        except UserSettings.DoesNotExist:
            return Response({
                "message": "settings not found"
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSettingsSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = UserSettings.objects.get(user_id=id)
        except UserSettings.DoesNotExist:
            return Response({"message": "Not found error"})
        serializer = UserSettingsSerializer(obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = UserSettings.objects.get(user_id=id)
        except UserSettings.DoesNotExist:
            return Response({"message": "Not found error"})
        serializer = UserSettingsSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
