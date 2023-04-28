import uuid
from datetime import datetime
from unicodedata import decimal
from xml.dom import minidom
from xml.etree import ElementTree

import requests
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from yookassa import Payment as yooPayment, Configuration

from base.models import Product, Order, OrderItem, ShippingAddress, Profile, P5sOrder, P5sOrderItem, Payment, Assortiment
from baseresponse.serializers import OrderSerializer, ProfileSerializer, PaymentSerializer, P5sOrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'Нет товара в заказе'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # Create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            # taxPrice=data['taxPrice'],
            # shippingPrice = data['shippingPrice'],
            totalPrice=data['totalPrice'],
            comments=data['comments']
        )
        # create ShippingAddress
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            street=data['shippingAddress']['daAddress']['data']['street_with_type'],
            house = data['shippingAddress']['daAddress']['data']['house'],
            flat = data['shippingAddress']['daAddress']['data']['flat'],
            city=data['shippingAddress']['city'],
            postalcode=data['shippingAddress']['postalcode'],
            country=data['shippingAddress']['country'],
            shippmentMethod=data['shippingAddress']['shippmentMethod']
        )
        # create order Items and set order to orderItem relationship
        messagegre = ''
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            if data['paymentMethod'] == 'bankCard':
                item = OrderItem.objects.create(
                    product=product,
                    aID=i['aID'],
                    order=order,
                    name=product.name,
                    qty=i['qty'],
                    size=i['size'],
                    color=i['color'],
                    price=float(i['discountPrice']),
                    image=product.imageSmall,
                )
            else:
                item = OrderItem.objects.create(
                    product=product,
                    aID=i['aID'],
                    order=order,
                    name=product.name,
                    qty=i['qty'],
                    size=i['size'],
                    color=i['color'],
                    price=float(i['price']),
                    image=product.imageSmall,
                )
            assortiment = Assortiment.objects.get(aID=i['aID'])
            assortiment.countInStock -= int(i['qty'])
            assortiment.save()

        # update stock

            product.save()
            messagegre += f"""{item.name, item.aID, i['product'], item.qty, item.price}"""
        serializer = OrderSerializer(order, many=False)

        profile = Profile.objects.get(user_id=user.id)
        subjectgre = f"""Новый заказ от {user.first_name, user.email, user.id, order, ProfileSerializer(profile).data['phone_number']}"""
        # messagegre += f"""{}"""
        # http_message = ''
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['leoevgeniy@gmail.com']
        send_mail(subjectgre, messagegre, email_from, recipient_list)

        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addP5sOrder(request):
    user = request.user
    profile = Profile.objects.get(user_id=user.id)
    data = request.data
    payload = ''
    for i in data['orderItems']:
        payload += f'{i["aID"]}-{i["qty"]}-{i["price"]},'
    orderItems = data['orderItems']
    orderList = payload[:len(payload) - 1]

    if data['shippingAddress']['shippmentMethod'] == 'sdek':
        delivery = 10
    elif data['shippingAddress']['shippmentMethod'] == 'pochtaRf':
        delivery = 2
    elif data['shippingAddress']['shippmentMethod'] == 'mskCur':
        delivery = 1
    elif data['shippingAddress']['shippmentMethod'] == 'mskSelf':
        delivery = 4
    if data['paymentMethod'] == 'cash' or data['paymentMethod'] == 'deliveryCard':
        paymentMethod = 0
    else:
        paymentMethod = 1

    headers = {
        # "Content-type": "application/form-data",
        'ApiKey': '62e3b498a67f03.93794391',
        'TestMode': 0,
        'order': orderList,
        'ExtOrderID': data['orderID'],
        'ExtOrderPaid': paymentMethod,
        'ExtDeliveryCost': 0,
        'dsDelivery': delivery,
        'dsFio': user.first_name,
        'dsMobPhone': str(profile.phone_number),
        'dsEmail': user.email,
        'dsCity': data['shippingAddress']['city'],
        'dsStreet': data['shippingAddress']['street'],
        'dsHouse': data['shippingAddress']['house'],
        'dsFlat': data['shippingAddress']['flat'],
        'dsPostcode': data['shippingAddress']['postalcode'],
        'dsCountry': data['shippingAddress']['country'],
        'dsComments': data['comments']

    }
    url = 'http://api.ds-platforma.ru/ds_order.php'
    ResultStatus=''
    ResultStatusMsg=''
    timestamp=''
    p5sOrderId=''
    totalSum=''
    ExtTotalSum=''
    ExtDeliveryCost=''
    OrderItems=''
    pickupDate=''
    ErrorItems=''
    comments=data['comments']
    messages=''


    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'Нет товаров в заказе'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        if P5sOrder.objects.filter(ExtOrderID_id=data['orderID']).exists():
            return Response({'detail': 'Заказ уже создан'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = requests.post(url, headers)

            if response.ok:

                for i in ElementTree.fromstring(response.content):
                    if i.tag == 'ResultStatus':
                        ResultStatus = i.text
                    if i.tag == 'ResultStatusMsg':
                        ResultStatusMsg = i.text
                    if i.tag == 'timestamp':
                        timestamp = i.text
                if int(ResultStatus) != 5 and int(ResultStatus) == 0:
                    for i in ElementTree.fromstring(response.content):
                        if i.tag == 'orderID':
                            p5sOrderId = i.text
                        if i.tag == 'totalSum':
                            totalSum = i.text
                        if i.tag == 'ExtTotalSum':
                            ExtTotalSum = i.text
                        if i.tag == 'ExtDeliveryCost':
                            ExtDeliveryCost = i.text
                        if i.tag == 'OrderItems':
                            OrderItems = i.text
                        if i.tag == 'pickupDate':
                            pickupDate = i.text
                        if i.tag == 'ErrorItems':
                            ErrorItems = i.text
                        if i.tag == 'messages':
                            messages = i.text

                    p5sOrder = P5sOrder.objects.create(
                        ResultStatus=ResultStatus,
                        ResultStatusMsg=ResultStatusMsg,
                        timestamp=timestamp,
                        orderID=p5sOrderId,
                        totalSum=totalSum,
                        dsComments=comments,
                        pickupDate=pickupDate,
                        ExtTotalSum=ExtTotalSum,
                        ExtDeliveryCost=ExtDeliveryCost,
                        messages=messages,
                        ExtOrderID_id=data['orderID']
                    )
                    for item in data['orderItems']:
                        P5sOrderItem.objects.create(
                            p5sOrder=p5sOrder,
                            prodID=item['product'],
                            name=item['name'],
                            qty=item['qty'],
                            ds_price=item['price'],
                            aID=item['aID']
                        )
                else:
                    p5sOrder = P5sOrder.objects.create(
                        ResultStatus=ResultStatus,
                        ResultStatusMsg=ResultStatusMsg,
                        timestamp=timestamp,
                        ExtOrderID_id=data['orderID']
                    )
                    for item in data['orderItems']:
                        P5sOrderItem.objects.create(
                            p5sOrder=p5sOrder,
                            prodID=item['product'],
                            name=item['name'],
                            qty=item['qty'],
                            ds_price=item['price'],
                            aID=item['aID']
                        )
        serializer = P5sOrderSerializer(p5sOrder, many=False)
        return Response(serializer.data)
        # return Response(response)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getP5sOrderDetails(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)
    try:
        if order.paymentMethod == 'cash' or order.paymentMethod == 'deliveryCard' or order.isPaid:
            headers = {
                'ApiKey': '62e3b498a67f03.93794391',
                'ExtOrderID': pk,
            }
            url = 'http://api.ds-platforma.ru/ds_get_order_data.php'
            responce = requests.get(url, headers)
            if responce.ok:
                if P5sOrder.objects.filter(ExtOrderID_id=pk).exists():
                    p5sOrder = P5sOrder.objects.get(ExtOrderID_id=pk)
                else:
                    Response({'detail': 'Заказ не существует'}, status=status.HTTP_400_BAD_REQUEST)
                data = minidom.parseString(responce.content)

                result = data.getElementsByTagName('Result')
                p5sOrder.ResultStatus = data.getElementsByTagName('ResultStatus')[0].firstChild.data
                p5sOrder.ResultStatusMsg = data.getElementsByTagName('ResultStatusMsg')[0].firstChild.data
                p5sOrder.timestamp = data.getElementsByTagName('timestamp')[0].firstChild.data
                orders = data.getElementsByTagName('Orders')
                for orderItem in orders:
                    p5sOrder.orderID = orderItem.getElementsByTagName('orderID')[0].firstChild.data
                    p5sOrder.ExtDateOfAdded = orderItem.getElementsByTagName('ExtDateOfAdded')[0].firstChild.data
                    p5sOrder.ExtOrderPaid = orderItem.getElementsByTagName('ExtOrderPaid')[0].firstChild.data
                    p5sOrder.ExtOrderTotal = orderItem.getElementsByTagName('ExtOrderTotal')[0].firstChild.data
                    p5sOrder.ExtDeliveryCost = orderItem.getElementsByTagName('ExtDeliveryCost')[0].firstChild.data
                    if orderItem.getElementsByTagName('dsDeliveryPriceTo')[0].firstChild:
                        p5sOrder.dsDeliveryPriceTo = orderItem.getElementsByTagName('dsDeliveryPriceTo')[0].firstChild.data
                    if orderItem.getElementsByTagName('dsDeliveryPriceBack')[0].firstChild:
                        p5sOrder.dsDeliveryPriceBack = orderItem.getElementsByTagName('dsDeliveryPriceBack')[
                            0].firstChild.data
                    if orderItem.getElementsByTagName('dsDeliveryAgentMoney')[0].firstChild:
                        p5sOrder.dsDeliveryAgentMoney = orderItem.getElementsByTagName('dsDeliveryAgentMoney')[
                            0].firstChild.data
                    if orderItem.getElementsByTagName('dsDelivery')[0].firstChild:
                        p5sOrder.dsDelivery = orderItem.getElementsByTagName('dsDelivery')[0].firstChild.data
                    if orderItem.getElementsByTagName('dsDeliveryDate')[0].firstChild:
                        p5sOrder.dsDeliveryDate = orderItem.getElementsByTagName('dsDeliveryDate')[0].firstChild.data
                    if orderItem.getElementsByTagName('dsDeliveryAgentMoney')[0].firstChild:
                        p5sOrder.dsDeliveryAgentMoney = orderItem.getElementsByTagName('dsDeliveryAgentMoney')[
                            0].firstChild.data
                    if orderItem.getElementsByTagName('dsComments')[0].firstChild:
                        p5sOrder.dsComments = orderItem.getElementsByTagName('dsComments')[0].firstChild.data
                    if orderItem.getElementsByTagName('dsPickPointID')[0].firstChild:
                        p5sOrder.dsPickPointID = orderItem.getElementsByTagName('dsPickPointID')[0].firstChild.data
                    if orderItem.getElementsByTagName('dsComments')[0].firstChild:
                        p5sOrder.dsComments = orderItem.getElementsByTagName('dsComments')[0].firstChild.data
                    if orderItem.getElementsByTagName('orderDate')[0].firstChild:
                        p5sOrder.orderDate = orderItem.getElementsByTagName('orderDate')[0].firstChild.data
                    if orderItem.getElementsByTagName('pickupDate')[0].firstChild:
                        p5sOrder.pickupDate = orderItem.getElementsByTagName('pickupDate')[0].firstChild.data
                    if orderItem.getElementsByTagName('dsFullAddress')[0].firstChild:
                        p5sOrder.dsFullAddress = orderItem.getElementsByTagName('dsFullAddress')[0].firstChild.data
                    if orderItem.getElementsByTagName('status')[0].firstChild:
                        if orderItem.getElementsByTagName('status')[0].firstChild.data == '1':
                                p5sOrder.status = 'Принят'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '2':
                                p5sOrder.status = 'Обработка на складе'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '3':
                                p5sOrder.status = 'Ожидает подтверждения'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '4':
                                p5sOrder.status = 'Товар забронирован'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '5':
                                p5sOrder.status = 'Готов к отгрузке'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '6':
                                p5sOrder.status = 'Выслан на почту'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '7':
                                p5sOrder.status = 'Оплачен и доставлен'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '8':
                                p5sOrder.status = 'Вы отменили заказ'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '9':
                                p5sOrder.status = 'Комплектация товара на складе'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '10':
                                p5sOrder.status = 'Злонамеренный отказ'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '11':
                                p5sOrder.status = 'Отправлен с курьером'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '12':
                                p5sOrder.status = 'Отгружен. Ожидаем оплату'
                        elif orderItem.getElementsByTagName('status')[0].firstChild.data == '13':
                                p5sOrder.status = 'Удален'

                p5sOrder.save()
                serializer = P5sOrderSerializer(p5sOrder, many=False)
                return Response(serializer.data)
        else:
            return Response({'detail': 'Заказ не существует'}, status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response({'detail': 'Заказ не существует'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderByID(request, pk):
    user = request.user

    order = Order.objects.get(_id=pk)

    try:
        if user.is_staff or order.user == user:

            # if payment.Exist and payment.success:
            #     order.isPaid = True
            #     order.save()
            serializer = OrderSerializer(order, many=False)

            return Response(serializer.data)
        else:
            return Response({'detail': 'Вы не авторизованы, чтобы увидеть этот заказ'},
                            status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Заказ не существует'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Заказ был оплачен')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Заказ был доставлен')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def PaymentDetails(request, pk):
    Configuration.account_id = '943529'
    Configuration.secret_key = 'live_6LB64qd7LospKObEfmOcCO7XgcofzLG3aHerB3Xlt9o'
    order = request.data['order']
    user = request.data['userDetails']

    if Payment.objects.filter(order_id=order['_id']).exists():
        payment = Payment.objects.get(order_id=order['_id'])
        order = Order.objects.get(_id=order['_id'])

        res = yooPayment.find_one(payment.payment_id)
        if res.payment_method == 'sbp' and not order.isPaid:
            payment.payment_method = res.payment_method.type
        if res.cancellation_details:
            payment.status = res.status
            payment.save()
            return Response(res.status)
        if res.payment_method:
            payment.payment_method = res.payment_method.type
        if res.paid:
            payment.amount = res.amount.value
            payment.captured_at = res.captured_at
            payment.income_amount = res.income_amount.value
            payment.is_paid = res.paid
            payment.auth_code = res.authorization_details.auth_code
            payment.rrn = res.authorization_details.rrn
            payment.three_d_secure_applied = res.authorization_details.three_d_secure.applied
            payment.payment_card_data_card_type = res.payment_method.card.card_type
            payment.payment_card_data_expiry_month = res.payment_method.card.expiry_month
            payment.payment_card_data_expiry_year = res.payment_method.card.expiry_year
            payment.payment_card_data_issuer_country = res.payment_method.card.issuer_country
            payment.payment_method_title = res.payment_method.title
            payment.payment_method = res.payment_method.type
            order.isPaid = res.paid
            order.paidAt = res.captured_at
            payment.status = res.status
            order.save()
        payment.save()

        serializer = PaymentSerializer(payment, many=False)
        return Response(serializer.data)
    else:
        return Response('Запрос на оплату не отправлялся')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def SBPRecreate(request, pk):
    Configuration.account_id = '943529'
    Configuration.secret_key = 'live_6LB64qd7LospKObEfmOcCO7XgcofzLG3aHerB3Xlt9o'
    order = request.data['order']
    user = request.data['userDetails']
    payment = Payment.objects.get(order_id=order['_id'])
    if Payment.objects.filter(order_id=order['_id']).exists():
        if not order['isPaid'] and payment.payment_method == 'sbp':
            payment.delete()
            items = itemsCreate(order)
            res = yooRequest(order, user, items)
            confirmation_token = res.confirmation.confirmation_token
            payment = Payment.objects.create(
                order_id=order['_id'],
                payment_id=res.id,
                created_at=res.created_at,
                confirmation_url=confirmation_token,
                amount=res.amount.value,
                description=f'Оплата заказа №{order["_id"]}',
                status=res.status,
                test=res.test,
                is_paid=res.paid,
                # payment_method=res.payment_method.type,
                # payment_method_id=res.payment_method.id,
                # payment_method_saved=res.payment_method.saved
            )
    serializer = PaymentSerializer(payment, many=False)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def PaymentRequest(request, pk):
    Configuration.account_id = '943529'
    Configuration.secret_key = 'live_6LB64qd7LospKObEfmOcCO7XgcofzLG3aHerB3Xlt9o'
    order = request.data['order']
    user = request.data['userDetails']


    # try:
    #     url = request.url
    # except:
    #     url = None
    if not Payment.objects.filter(order_id=order['_id']).exists():
        items = itemsCreate(order)
        res = yooRequest(order, user, items)

        confirmation_token = res.confirmation.confirmation_token
        payment = Payment.objects.create(
            order_id=order['_id'],
            payment_id=res.id,
            created_at=res.created_at,
            confirmation_url=confirmation_token,
            amount=res.amount.value,
            description=f'Оплата заказа №{order["_id"]} со скидкой 10%',
            status=res.status,
            test=res.test,
            is_paid=res.paid,
            # payment_method=res.payment_method.type,
            # payment_method_id=res.payment_method.id,
            # payment_method_saved=res.payment_method.saved
        )
    else:
        payment = Payment.objects.get(order_id=order['_id'])
        # if not order.isPaid and payment.payment_method == 'sbp':
        if payment.status == 'canceled':
            # or (not order['isPaid'] and payment.payment_method == 'sbp'):
            payment.delete()
            items = itemsCreate(order)
            res = yooRequest(order, user, items)
            confirmation_token = res.confirmation.confirmation_token
            payment = Payment.objects.create(
                order_id=order['_id'],
                payment_id=res.id,
                created_at=res.created_at,
                confirmation_url=confirmation_token,
                amount=res.amount.value,
                description=f'Оплата заказа №{order["_id"]}',
                status=res.status,
                test=res.test,
                is_paid=res.paid,
                # payment_method=res.payment_method.type,
                # payment_method_id=res.payment_method.id,
                # payment_method_saved=res.payment_method.saved
            )
    serializer = PaymentSerializer(payment, many=False)
    return Response(serializer.data)
def itemsCreate(order):
    items = []
    itemsTotalPrice = 0
    for item in order['orderItems']:
        itemsTotalPrice += float(item['price'])
        item_to_add = {
            "description": item['name'],
            "quantity": item['qty'],
            "amount": {
                "value": item['price'],
                "currency": "RUB"
            },
            'vat_code': 1,
            'measure': 'piece',
            'payment_subject': 'commodity',
            'payment_mode': 'full_payment',
        }
        items.append(item_to_add)
    print(itemsTotalPrice, order['totalPrice'])
    if float(order['totalPrice']) > itemsTotalPrice:
        item_to_add = {
            "description": 'доставка',
            "quantity": 1,
            "amount": {
                "value": 300,
                "currency": "RUB"
            },
            'vat_code': 1,
            'measure': 'piece',
            'payment_subject': 'commodity',
            'payment_mode': 'full_payment',
        }
    items.append(item_to_add)
    return items

def yooRequest(order, user, items):
    idempotence_key = str(uuid.uuid4())
    result = yooPayment.create(
        {
            "amount": {
                "value": order['totalPrice'],
                "currency": "RUB"
            },
            "confirmation": {
                "type": "embedded",
                # "return_url": request.data['url']
            },
            "capture": True,
            "description": f'Оплата заказа {order["_id"]} со скидкой 10%',
            "metadata": {
                'orderNumber': order["_id"]
            },
            "receipt": {
                "customer": {
                    "full_name": user['name'],
                    "email": user['email'],
                    "phone": user['phone_number'],
                },
                "items": items,
            },
            # "carture": False,
            # 'payment_method_data': {
            #     'type': 'bank_card'
            # },
        }, idempotence_key
    )
    return result
