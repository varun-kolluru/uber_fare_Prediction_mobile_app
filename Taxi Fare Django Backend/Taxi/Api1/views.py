from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pickle
import sklearn 
from sklearn.metrics import mean_squared_error
from django.contrib.auth import logout,get_user_model
from .serializers import UserRegistrationSerializer,Data_serializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes,throttle_classes
from rest_framework.throttling import AnonRateThrottle,UserRateThrottle

@api_view(['GET','POST'])   #by default it is get only
@permission_classes([IsAuthenticated])
@throttle_classes(UserRateThrottle)
def dist_cal_view(request):
    if request.method=='POST':
        loaded_model=pickle.load(open('C:/Users/varun/Desktop/Django/Taxi Fare Predictor/Taxi/Model/linear_reg_model.pkl', 'rb'))
        p=loaded_model.predict([[request.data['distance']]])
        return Response(p[0][0])
    
@api_view(['GET','POST'])  
@permission_classes([IsAuthenticated]) 
@throttle_classes(UserRateThrottle)
def save_data_view(request):
    if request.method=='POST':
        serialized_item=Data_serializer(data=request.data)
        serialized_item.is_valid(raise_exception=True)
        serialized_item.save()
        mae=mean_squared_error([request.data['actual_cost']],[request.data['pred_cost']] )
        return Response(mae)
    
@api_view(['POST'])
@throttle_classes(AnonRateThrottle)
def UserRegister(request):
    if request.method=='POST':
        print(request.data)
        serialized_item=UserRegistrationSerializer(data=request.data)
        serialized_item.is_valid(raise_exception=True)
        email=request.data['email']
        password=request.data['password']
        username=request.data['username']
        user=get_user_model().objects.create_user(email=email,password=password,username=username)
        user.fname=request.data['fname']
        user.lname=request.data['lname']
        user.save()
        return Response("Registered")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def UserLogout(request):
    if request.method=='POST':
        logout(request)
        return Response('Logout')
        
        

