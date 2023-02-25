from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from authentication.serializers.tokenSerializer import MyTokenObtainPairSerializer, SignInSerializer, RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterAPIView(GenericAPIView):
    authentication_classes = []
    permission_classes = []

    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserTokenView(APIView):
    permission_classes = ()
    authentication_classes = ()
    serializer_class = SignInSerializer

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "username": openapi.Schema(type=openapi.TYPE_STRING),
                "password": openapi.Schema(type=openapi.TYPE_STRING)
            },
            required=["username", "password"],
        )
    )
    def post(self, request):
        received_json_data = request.data
        serializer = self.serializer_class(data=received_json_data)
        if serializer.is_valid():
            user = authenticate(
                request,
                username=received_json_data['username'],
                password=received_json_data['password'])
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user_id': user.id
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'message': 'invalid username or password',
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return JsonResponse({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except BaseException as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/v1/sign-up',
        '/api/v1/login',
        '/api/v1/token/refresh',
    ]
    return Response(routes)
