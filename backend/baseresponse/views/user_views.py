import random
import string
from urllib import response

import requests
from django.shortcuts import render
from django.utils.datetime_safe import datetime
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Profile

from django.conf import settings
from django.core.mail import send_mail, EmailMessage

from baseresponse.serializers import UserSerializer, UserSerializerWithToken, ProfileSerializer, \
    TokenObtainSerializerPhone

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializerPhone(TokenObtainSerializerPhone):
    def validate(self, attrs):

        data = super().validate(attrs)
        try:
            serializer = UserSerializerWithToken(self.user).data
            for k, v in serializer.items():
                data[k] = v
            return data
        except:
            message = {'detail': 'Пользователь с таким номером телефона не зарегистрирован'}
            return message


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    # serializer_class = MyTokenObtainPairSerializer
    def get_serializer_class(self):
        if "phone_number" in self.request.data:
            return MyTokenObtainPairSerializerPhone
        return MyTokenObtainPairSerializer


# Create your views here.
@api_view(['POST'])
def passwordReset(request):
    pk = request.data['email']
    password = request.data['password']

    try:
        user = User.objects.get(profile__password_change_link=pk)
        user.password = make_password(password)
        profile = Profile.objects.get(user_id=user)
        profile.is_password_changed = True
        profile.password_changeAt = datetime.now

        html_message = f"""\
                    <html>
                        <head></head>
                        <body>
                            <h1> {user.first_name} </h1> \
                            <p>Вы сменили пароль в Магазине радости.</p> \
                            <button> <a href="http://localhost:3000/"> Продолжить покупки </a></button>
                        </body>
                    </html>"""
        subject = 'Восстановление доступа в Магазин радости'
        # message = f'{user.first_name} /n Вы хотите сбросить пароль в Магазине радости. /n ' \
        #           f'  '
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]
        email = EmailMessage(subject, html_message, email_from, to=recipient_list)
        email.content_subtype = 'html'
        email.send()
        user.save()
        profile.save()
        serializer = UserSerializerWithToken(user, many=False)
        res = serializer.data.copy()
        return Response(res)
    except:
        message = {'detail': 'Пользователя с таким Email не зарегистрирован'}
        return Response(message)


def generate_random_string(length):
    letters = string.ascii_lowercase
    rand_string = ''.join(random.choice(letters) for i in range(length))
    return rand_string


@api_view(['GET'])
def getUserByPhoneNumber(request):
    phone_number = request.query_params.get('phone')
    try:
        profile = Profile.objects.get(phone_number=phone_number)
        return Response(User.objects.get(id=profile.user_id).id)
    except:
        return Response({'detail': 'Пользователь с таким номером телефона не зарегистрирован'})


@api_view(['POST'])
def initiatePasswordReset(request):
    data = request.data

    try:
        user = User.objects.get(username=data['email'])

        profile = Profile.objects.get(user_id=user.id)
        profile.password_change_link = generate_random_string(40)

        html_message = f"""\
                    <html>
                        <head></head>
                        <body>
                            <h1> {user.first_name} </h1> \
                            <p>Вы хотите сбросить пароль в Магазине радости.</p> \
                            <button> <a href="http://localhost:3000/restore-password/{profile.password_change_link}"> Сброс Пароля </a></button>
                        </body>
                    </html>"""
        subject = 'Восстановление доступа в Магазин радости'
        # message = f'{user.first_name} /n Вы хотите сбросить пароль в Магазине радости. /n ' \
        #           f'  '
        profile.save()
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [data['email']]
        email = EmailMessage(subject, html_message, email_from, to=recipient_list)
        email.content_subtype = 'html'
        email.send()
        serializer = UserSerializerWithToken(user, many=False)
        res = serializer.data.copy()
        return Response(res)
    except:
        message = {'detail': 'Пользователя с таким Email не зарегистрирован'}
        return Response(message)


@api_view(['GET'])
def phoneConfirmationRegister(request):
    res = {}
    phone_number = request.query_params.get('phone')
    email = request.query_params.get('email')
    key = request.query_params.get('key')
    service_id = request.query_params.get('service_id')
    phone = requests.get(
        f'https://api.ucaller.ru/v1.0/checkPhone?phone={phone_number}&key={key}&service_id={service_id}').json()[
        'phone']

    code = \
        requests.get(
            f'https://api.ucaller.ru/v1.0/initCall?phone={phone}&key={key}&service_id={service_id}').json()[
            'code']
    res['code'] = code
    return Response(res)


@api_view(['GET'])
def phoneConfirmation(request):
    res = {}
    phone_number = request.query_params.get('phone')
    email = request.query_params.get('email')
    key = request.query_params.get('key')
    service_id = request.query_params.get('service_id')
    try:
        profile = Profile.objects.get(phone_number=phone_number)
        res['exist'] = 'true'
        phone = requests.get(f'https://api.ucaller.ru/v1.0/checkPhone?phone={phone_number}&key={key}&service_id={service_id}').json()['phone']

        code = requests.get(f'https://api.ucaller.ru/v1.0/initCall?phone={phone}&key={key}&service_id={service_id}').json()['code']
        res['code'] = code
        return Response(res)
    except:
        phone = requests.get(f'https://api.ucaller.ru/v1.0/checkPhone?phone={phone_number}&key={key}&service_id={service_id}').json()['phone']

        code = requests.get(f'https://api.ucaller.ru/v1.0/initCall?phone={phone}&key={key}&service_id={service_id}').json()['code']
        res['code'] = code
        return Response(res)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    if not data['name']:
        data['name'] = 'Гость'
    try:
        if data['email']:
            User.objects.get(email=data['email'])
            message = {'detail': 'Пользователь с таким e-mail уже существует'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        pass
    try:
        Profile.objects.get(phone_number=data['phone_number'])
        message = {'detail': f'Пользователь с таким номером телефона уже существует'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        pass
    if not data['email'] or data['email'] == '':
        user = User.objects.create(
            first_name=data['name'],
            username=data['phone_number'],
            password=make_password(data['password'])
        )
        Profile.objects.create(
            user_id=user.id,
            phone_number=data['phone_number']
        )

    else:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        Profile.objects.create(
            user_id=user.id,
            phone_number=data['phone_number']
        )
    serializer = UserSerializerWithToken(user, many=False)
    res = serializer.data.copy()
    res['phone_number'] = data['phone_number']

    subject = 'Добро пожаловать в Магазин радости'
    message = f'{user.first_name} Зарегистрировался в Магазине радости. {user.email, data["phone_number"]} '
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['leoevgeniy@gmail.com']
    send_mail(subject, message, email_from, recipient_list)
    if user.email:
        subjectgre = f'{user.first_name}, Добро пожаловать в Магазин радости'
        messagegre = f"""{user.first_name} , спасибо за регистрацию в Магазине радости. Найдите для себя то, что действительно принесет """
        http_message = 'Cпасибо за регистрацию в Магазине радости. Найдите для себя то, ' \
                       'что действительно принесет <h1><a href="https://lltoys.ru">радость</a></h1> '
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]
        send_mail(subjectgre, messagegre, email_from, recipient_list, html_message=http_message)

    return Response(res)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    profile = Profile.objects.get(user_id=user.id)

    data = request.data
    profile.phone_number = data['phone_number']
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    profile.save()

    return Response(serializer.data)


@api_view(['Get'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    profile = Profile.objects.get(user_id=user.id)

    serializer = UserSerializer(user, many=False)
    phone = ProfileSerializer(profile).data['phone_number']
    res = serializer.data
    res['phone_number'] = str(phone)
    return Response(res)


@api_view(['Get'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    profileForDeletion = Profile.objects.get(user_id=pk)
    userForDeletion.delete()
    profileForDeletion.delete()
    return Response('Пользователь был удален')


@api_view(['Get'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    profile = Profile.objects.get(user_id=pk)

    serializer = UserSerializer(user, many=False)
    phone = ProfileSerializer(profile).data['phone_number']
    res = serializer.data
    res['phone_number'] = str(phone)
    return Response(res)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    profile = Profile.objects.get(user_id=pk)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
    profile.phone_number = data['phone_number']
    user.save()

    profile.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)
