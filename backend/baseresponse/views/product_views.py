import datetime
import math
import operator
import urllib
import urllib.parse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.response import Response
import csv
import codecs
import requests
from django.conf import settings
from django.core.mail import send_mail
from base.models import Product, Review, Category, Assortiment
from django.db.models import Q, Max
from baseresponse.serializers import ProductSerializer
from rest_framework import status

def send_telegram():
    product = Product.objects.filter(Q(assortiment__countInStock__gt=0) & Q(isNovelties__iexact=1)).distinct().order_by(
        '?')[:1]
    photo = product.image1
    name = product.name
    description = product.description
    token = '6920212214:AAEaa9dPlxlOv6ZvgrptttRwLgv-W8ua9m8'
    chat_id = '-1001728234751'
    text = ''
    api = 'https://api.telegram.org/bot'
    method = api + token + '/sendPhoto'

    text = f'🔥 {name} ⚡️' \
           f' {description}'

    req = requests.post(method + '?chat_id=' + chat_id + '&caption=' + text + '&photo=' + photo)
    # req = requests.post('https://api.telegram.org/bot' + token + '/getUpdates')
    # req = requests.get('https://api.telegram.org/bot')




@api_view(['POST'])
def getProducts(request, *args):
    query = request.query_params.get('keyword')
    if query is None:
        query = ''
    if request.data.get('novelties'):
        products = Product.objects.filter(
            Q(assortiment__countInStock__gt=0) & Q(isNovelties__iexact=1)).distinct().order_by('name')
    elif request.data.get('supersale'):
        products = Product.objects.filter(
            Q(isSuperSale__exact=1) & Q(assortiment__countInStock__gt=0)).distinct().order_by('name')
    elif request.data.get('bestsellers'):
        products = Product.objects.filter(
            Q(isBestSeller__iexact=1) & Q(assortiment__countInStock__gt=0)).distinct().order_by('name')
    else:
        products = Product.objects.filter(
            Q(assortiment__countInStock__gt=0) & Q(name__icontains=query) | Q(category__category__icontains=query) | Q(
                category__subCategory__icontains=query)).distinct().order_by('name')
    #                               & Q(category__category__icontains=category) & Q(
    # category__subCategory__icontains=filterer) & Q(retailPrice__gte=priceLow) & Q(retailPrice__lte=priceUp) &
    #                               Q(assortiment__countInStock__gt=0) & Q(brand__icontains=vendor) & Q(
    # CollectionName__contains=collection) &
    #                               Q(material__icontains=material) & Q(assortiment__color__icontains=color) &
    #                               Q(assortiment__size__icontains=size))
    # maxPrice = Product.objects.filter(Q(name__icontains=query) & Q(category__category__icontains=category) & Q(
    #     category__subCategory__icontains=filterer) &
    #                                   Q(assortiment__countInStock__gt=0) & Q(brand__icontains=vendor) & Q(
    #     CollectionName__contains=collection) &
    #                                   Q(material__icontains=material) & Q(assortiment__color__icontains=color) &
    #                                   Q(assortiment__size__icontains=size)).aggregate(Max('retailPrice'))[
    #     'retailPrice__max']
    # vendorList = []
    # collectionList = []
    # materialList = []
    # colorList = []
    # colorUrlList = []
    # sizeList = []
    # priceUpApi = 0
    # priceLowApi = 10000000
    productsLength = len(products)
    categoryList = {}
    subCategoryList = {}

    # if query:
    #     for product in products:
    #         try:
    #             categoryRecords = Category.objects.filter(product=product._id)
    #             for categoryRecord in categoryRecords:
    #                 if categoryRecord.category not in categoryList.keys():
    #                     categoryList[categoryRecord.category] = 1
    #                 else:
    #                     categoryList[categoryRecord.category] += 1
    #                 if categoryRecord.subCategory not in subCategoryList.keys():
    #                     subCategoryList[categoryRecord.subCategory] = 1
    #                 else:
    #                     subCategoryList[categoryRecord.subCategory] += 1
    #
    #         except:
    #             pass
    if categoryList and subCategoryList:
        sortedCategoryTuple = sorted(categoryList.items(), key=operator.itemgetter(1), reverse=True)
        sortedCategoryList = {k: v for k, v in sortedCategoryTuple}
        sortedSubCategoryTuple = sorted(subCategoryList.items(), key=operator.itemgetter(1), reverse=True)
        sortedSubCategoryList = {k: v for k, v in sortedSubCategoryTuple}
    else:
        sortedCategoryList = {}
        sortedSubCategoryList = {}

    # for product in products:
    #     assortiment = {}
    #     try:
    #         assortiment = Assortiment.objects.filter(product_id=product._id)
    #     except:
    #         pass
    #     if product.retailPrice > priceUpApi:
    #         priceUpApi = product.retailPrice
    #     if product.retailPrice < priceLowApi:
    #         priceLowApi = product.retailPrice
    #     if product.brand and product.brand not in vendorList:
    #         vendorList.append(product.brand)
    #     if product.CollectionName and product.CollectionName not in collectionList:
    #         collectionList.append(product.CollectionName)
    #     if product.material and product.material not in materialList:
    #         materialList.append(product.material)
    #     if assortiment:
    #         for assort in assortiment:
    #             if assort.color and assort.color not in colorList and 'цвет не указан' not in assort.color:
    #                 colorList.append(assort.color)
    #             if assort.colorUrl and assort.colorUrl not in colorUrlList:
    #                 colorUrlList.append(assort.colorUrl)
    #             if assort.size and assort.size not in sizeList:
    #                 sizeList.append(assort.size)
    # if 'sorts' in args[0].keys():
    #     sort = args[0]['sorts'].split(' ')
    # if 'sorts' not in args[0].keys():
    #     sort = ''
    #     products = products.order_by('name')
    # elif sort:
    #     if len(sort) > 1:
    #         if sort[0] == 'PriceSortUp' and sort[1] == 'NameSortUp':
    #             products = products.order_by('retailPrice', 'name')
    #         elif sort[0] == 'PriceSortUp' and sort[1] == 'NameSortDown':
    #             products = products.order_by('retailPrice', '-name')
    #         elif sort[0] == 'PriceSortDown' and sort[1] == 'NameSortUp':
    #             products = products.order_by('-retailPrice', 'name')
    #         elif sort[0] == 'PriceSortDown' and sort[1] == 'NameSortDown':
    #             products = products.order_by('-retailPrice', '-name')
    #     elif sort[0] == 'PriceSortUp' and len(sort) == 1:
    #         products = products.order_by('retailPrice')
    #     elif sort[0] == 'PriceSortDown' and len(sort) == 1:
    #         products = products.order_by('-retailPrice')
    #     elif sort[0] == 'NameSortUp' and len(sort) == 1:
    #         products = products.order_by('name')
    #     elif sort[0] == 'NameSortDown' and len(sort) == 1:
    #         products = products.order_by('-name')

    page = request.query_params.get('page')

    paginator = Paginator(products, 12)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None or page == 'undefined':
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response(
        {
            'products': serializer.data,
            'categoryList': sortedCategoryList,
            'subCategoryList': sortedSubCategoryList,
            'productsLength': productsLength,
            # 'products': serializer.data,
            'page': page, 'pages': paginator.num_pages,
            # 'vendorList': vendorList,
            # 'collectionList': collectionList, 'colorUrlList': colorUrlList, 'materialList': materialList,
            # 'colorList': colorList, 'sizeList': sizeList,
            # 'priceUpApi': priceUpApi, 'priceLowApi': priceLowApi, 'maxPrice': maxPrice
        })


@api_view(['POST'])
def getTestProducts(request, **args):
    query = request.query_params.get('keyword')
    if query is None:
        query = ''
    isSuperSale = request.data['superSale']
    vendor = request.data['vendor']
    material = request.data['material']
    collection = request.data['collection']
    color = request.data['color']
    size = request.data['size']
    lowprice = request.data['lowprice']
    highprice = request.data['highprice']
    # encodig: utf-8
    category = urllib.parse.unquote(args['pk'])
    try:
        subcategory = urllib.parse.unquote(args['pk1'])
    except:
        subcategory = ''
    products = Product.objects.filter(
        Q(name__icontains=query) & Q(category__subCategory__icontains=subcategory) & Q(
            category__category__icontains=category) & Q(assortiment__countInStock__gt=0) & Q(
            brand__icontains=vendor) &
        Q(material__icontains=material) & Q(CollectionName__icontains=collection) & Q(
            assortiment__color__icontains=color) & Q(assortiment__size__icontains=size) & Q(
            retailPrice__gte=lowprice) & Q(retailPrice__lte=highprice)).distinct().order_by(
        'name')
    # maxPrice = productsMaxPrice.aggregate(Max('retailPrice'))
    page = request.query_params.get('page')
    paginator = Paginator(products, 12)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    if page is None or page == 'undefined':
        page = 1
    page = int(page)
    serializer = ProductSerializer(products, many=True)

    return Response(
        {'products': serializer.data,
         # 'category': query,
         'page': page,
         'pages': paginator.num_pages,
         #  'productsLength': productsLength,
         #  'subCategoriesList': subCategoriesList,

         #  'vendorList': vendorList,
         #  'collectionList': collectionList,
         # 'colorUrlList': colorUrlList,
         #  'materialList': materialList,
         #  'colorList': colorList,
         #  'sizeList': sizeList,
         # 'priceUpApi': priceUpApi,
         # 'priceLowApi': priceLowApi,
         #  'maxPrice': maxPrice['retailPrice__max']
         }
    )


@api_view(['POST'])
def getCategotyProducts(request, **args):
    query = request.query_params.get('keyword')
    isSuperSale = request.data['superSale']
    vendor = request.data['vendor']
    material = request.data['material']
    collection = request.data['collection']
    color = request.data['color']
    size = request.data['size']
    lowprice = request.data['lowprice']
    highprice = request.data['highprice']

    if query is None:
        query = ''

    category = urllib.parse.unquote(args['pk'])
    try:
        subcategory = urllib.parse.unquote(args['pk1'])
    except:
        subcategory = ''
    subCategoriesList = {}
    print(query, isSuperSale, type(isSuperSale), vendor, material, collection, color, size, lowprice, highprice,
          category, subcategory)
    categoriesList = {}
    if isSuperSale and isSuperSale == 'true':
        products = Product.objects.filter(
            Q(name__icontains=query) & Q(category__subCategory__icontains=subcategory) & Q(
                category__category__icontains=category) & Q(assortiment__countInStock__gt=0) & Q(
                isSuperSale__iexact=1) & Q(brand__icontains=vendor) &
            Q(material__icontains=material) & Q(CollectionName__icontains=collection) & Q(
                assortiment__color__icontains=color) & Q(assortiment__size__icontains=size) & Q(
                retailPrice__gte=lowprice) & Q(retailPrice__lte=highprice)).distinct().order_by('name')
    else:
        products = Product.objects.filter(
            Q(name__icontains=query) & Q(category__subCategory__icontains=subcategory) & Q(
                category__category__icontains=category) & Q(assortiment__countInStock__gt=0) & Q(
                brand__icontains=vendor) &
            Q(material__icontains=material) & Q(CollectionName__icontains=collection) & Q(
                assortiment__color__icontains=color) & Q(assortiment__size__icontains=size) & Q(
                retailPrice__gte=lowprice) & Q(retailPrice__lte=highprice)).distinct().order_by(
            'name')
    productsMaxPrice = Product.objects.filter(
        Q(name__icontains=query) & Q(category__subCategory__icontains=subcategory) & Q(
            category__category__icontains=category) & Q(assortiment__countInStock__gt=0) & Q(
            brand__icontains=vendor) &
        Q(material__icontains=material) & Q(CollectionName__icontains=collection) & Q(
            assortiment__color__icontains=color) & Q(assortiment__size__icontains=size))

    productsLength = len(products)
    vendorList = []
    collectionList = []
    materialList = []
    colorList = []
    sizeList = []
    maxPrice = 0
    if not subcategory:
        for product in products:
            if product.brand != '' and product.brand not in vendorList:
                vendorList.append(product.brand)
            if product.material != '' and product.material not in materialList:
                materialList.append(product.material)
            if product.CollectionName != '' and product.CollectionName not in collectionList:
                collectionList.append(product.CollectionName)
            try:
                assortiment = Assortiment.objects.filter(product=product._id)
                for assort in assortiment:
                    if assort.color != '' and assort.color != 'цвет не указан' and assort.color not in colorList:
                        colorList.append(assort.color)
                    if assort.size != '' and assort.size not in sizeList:
                        sizeList.append(assort.size)

            except:
                pass
            try:
                categories = Category.objects.filter(product=product._id)
                for cat in categories:
                    if cat.subCategory not in subCategoriesList.keys():
                        if isSuperSale:
                            subCategoriesList[cat.subCategory] = len(Product.objects.filter(
                                Q(category__subCategory__icontains=cat.subCategory) & Q(
                                    assortiment__countInStock__gt=0)) & Q(
                                isSuperSale__iexact=1))
                        else:
                            subCategoriesList[cat.subCategory] = len(Product.objects.filter(
                                Q(category__subCategory__icontains=cat.subCategory) & Q(
                                    assortiment__countInStock__gt=0)))
            except:
                pass
    else:
        for product in products:
            if product.brand != '' and product.brand not in vendorList:
                vendorList.append(product.brand)
            if product.material != '' and product.material not in materialList:
                materialList.append(product.material)
            if product.CollectionName != '' and product.CollectionName not in collectionList:
                collectionList.append(product.CollectionName)
            try:
                assortiment = Assortiment.objects.filter(product=product._id)
                for assort in assortiment:
                    if assort.color != '' and assort.color != 'цвет не указан' and assort.color not in colorList:
                        colorList.append(assort.color)
                    if assort.size != '' and assort.size not in sizeList:
                        sizeList.append(assort.size)
            except:
                pass

        try:
            categories = Category.objects.all()
            for cat in categories:
                if cat.category == category:
                    if cat.subCategory not in subCategoriesList:
                        if isSuperSale:
                            subCategoriesList[cat.subCategory] = len(Product.objects.filter(
                                Q(category__subCategory__icontains=cat.subCategory) & Q(
                                    assortiment__countInStock__gt=0)) & Q(
                                isSuperSale__iexact=1))
                        else:
                            subCategoriesList[cat.subCategory] = len(Product.objects.filter(
                                Q(category__subCategory__icontains=cat.subCategory) & Q(
                                    assortiment__countInStock__gt=0)))
        except:
            pass
    maxPrice = productsMaxPrice.aggregate(Max('retailPrice'))
    page = request.query_params.get('page')
    paginator = Paginator(products, 12)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    if page is None or page == 'undefined':
        page = 1
    page = int(page)
    serializer = ProductSerializer(products, many=True)
    return Response(
        {'products': serializer.data,
         'page': page,
         'pages': paginator.num_pages,
         'productsLength': productsLength,
         'subCategoriesList': subCategoriesList,

         'vendorList': vendorList,
         'collectionList': collectionList,
         # 'colorUrlList': colorUrlList,
         'materialList': materialList,
         'colorList': colorList,
         'sizeList': sizeList,
         # 'priceUpApi': priceUpApi,
         # 'priceLowApi': priceLowApi,
         'maxPrice': maxPrice['retailPrice__max']
         }
    )


@api_view(['GET'])
def getCatalog(request):
    catalog = {}
    categories = Category.objects.all()
    for category in categories:
        if category.category not in catalog:
            catalog[category.category] = [category.subCategory]
            # catalog[category.category].append(category.subCategory)
        else:
            if category.subCategory not in catalog[category.category]:
                catalog[category.category].append(category.subCategory)
    return Response(catalog)


@api_view(['GET'])
def getBestSellerProducts(request):
    products = Product.objects.filter(Q(assortiment__countInStock__gt=0) & Q(isBestSeller__iexact=1)).distinct()
    products = products.order_by('?')[:10]
    serializer = ProductSerializer(products, many=True)
    send_telegram()
    return Response(serializer.data)


@api_view(['GET'])
def getNewProducts(request):
    products = Product.objects.filter(Q(assortiment__countInStock__gt=0) & Q(isNovelties__iexact=1)).distinct()
    products = products.order_by('?')[:10]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(Q(assortiment__countInStock__gt=0) & Q(isSuperSale__iexact=1)).distinct()
    products = products.order_by('?')[:10]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def getSeenProducts(request):
    ids = request.data['oppenedItems']
    products = Product.objects.filter(Q(assortiment__countInStock__gt=0) & Q(prodId__in=ids)).distinct()
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)
    # return Response('')


@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False)
        response = serializer.data
        return Response(response)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def updateNewBestsellers(request):
    destination = str(settings.BASE_DIR) + "/new30.csv"
    url = 'http://feed.p5s.ru/smartFeedBuild/63e5c82610c204.52049305'
    urllib.request.urlretrieve(url, destination)
    old = Product.objects.filter(Q(isSuperSale=True) | Q(isBestSeller=True) | Q(isNovelties=True))
    olds = 0
    created = 0

    for i in old:
        i.isSuperSale = False
        i.isBestSeller = False
        i.isNovelties = False
        i.superSaleCost = None
        i.save()
        olds += 1
    url = destination
    with open(url, 'r', newline='', encoding='utf-8') as r:
        reader = csv.reader(r, delimiter=';', quotechar='"')
        count = 0
        for row in reader:  # Handle each row here...
            if count > 0:
                try:
                    product = Product.objects.get(prodId=row[0])
                    product.isSuperSale = row[4]
                    product.isBestSeller = row[5]
                    product.isNovelties = row[3]
                    product.price = row[2]
                    product.save()
                    created += 1
                except:
                    print('Нет такого товара')

            count += 1
    subject = 'Информация об обновлении Супер Скидки'
    message = f'{olds} Удалено. {created} товаров по Супер скидке обновились в Магазине радости. '
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['leoevgeniy@gmail.com']
    send_mail(subject, message, email_from, recipient_list)
    return Response('Данные обновлены!')


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def migrateProduct(request):
    destination = str(settings.BASE_DIR) + "/fullTotal.csv"
    url = 'http://feed.p5s.ru/smartFeedBuild/63986a106b1f49.24135419'
    urllib.request.urlretrieve(url, destination)
    created = 0
    createdvar = 0
    updated = 0
    updatedvar = 0
    products = []
    productsToUpdate = []
    assort = []
    assortToUpdate = []
    category = []
    with open(destination, 'r', encoding='utf-8') as csv_file:
        reader = csv.reader(csv_file, delimiter=';', quotechar='"')
        next(reader)
        productsArr = {product.prodId: product for product in Product.objects.all()}
        product_assortiment = {p_assortiment.aID: p_assortiment for p_assortiment in Assortiment.objects.all()}
        for row in reader:
            if row[40] or row[42]:
                print(row[40], row[42])
            if productsArr.get(row[0]):
                if row[42] == 1 and row[40] == 1:
                    productsToUpdate.append(
                        Product(_id=row[0], retailPrice=row[14], isBestSeller=True, isNovelties=True))
                elif row[42] == 1 and row[40] == 0:
                    productsToUpdate.append(
                        Product(_id=row[0], retailPrice=row[14], isBestSeller=True, isNovelties=False))
                elif row[40] == 1 and row[42] == 0:
                    productsToUpdate.append(
                        Product(_id=row[0], retailPrice=row[14], isBestSeller=False, isNovelties=True))
                else:
                    productsToUpdate.append(
                        Product(_id=row[0], retailPrice=row[14], isBestSeller=False, isNovelties=False))
                if product_assortiment.get(row[1]):
                    assortToUpdate.append(
                        Assortiment(id=row[1], countInStock=row[16], shippingDate=row[17])
                    )
                else:
                    rowAssort = Assortiment(
                        aID=row[1],
                        countInStock=row[16],
                        color=row[37],
                        colorUrl=row[38],
                        size=row[39],
                        barcode=row[2],
                        shippingDate=row[17],
                        product_id=row[0]
                    )
                    assort.append(rowAssort)
                    product_assortiment[row[1]] = rowAssort
                    createdvar += 1
                    created += 1
                updated += 1
                updatedvar += 1
            else:
                rowProduct = Product(
                    _id=row[0],
                    name=row[3],
                    brand=row[5],
                    batteries=row[21],
                    pack=row[22],
                    material=row[23],
                    CollectionName=row[26],
                    description=row[18],
                    discount=row[15],
                    stopPromo=row[52],
                    retailPrice=row[14],
                    baseRetailPrice=row[11],
                    wholePrice=row[12],
                    baseWholePrice=row[13],
                    lenght=row[24],
                    diameter=row[25],
                    brutto=row[19],
                    prodId=row[0],
                    vendorCode=row[4],
                    isBestSeller=row[42],
                    isNovelties=row[40],
                    imageSmall='/'.join(row[61].split('/')[:-1]).replace('big', 'small').replace('http://',
                                                                                                 'https://') + '/small_' +
                               row[0] + '.jpg',
                    image1=row[61].replace('http://', 'https://'),
                    image2=row[62].replace('http://', 'https://'),
                    image3=row[63].replace('http://', 'https://'),
                    image4=row[64].replace('http://', 'https://'),
                    image5=row[65].replace('http://', 'https://'),
                    image6=row[66].replace('http://', 'https://'),
                    image7=row[67].replace('http://', 'https://'),
                    image8=row[68].replace('http://', 'https://'),
                    image9=row[69].replace('http://', 'https://'),
                    image10=row[70].replace('http://', 'https://'),

                )
                products.append(rowProduct)
                productsArr[row[0]] = rowProduct
                rowAssort = Assortiment(
                    aID=row[1],
                    countInStock=row[16],
                    color=row[37],
                    colorUrl=row[38],
                    size=row[39],
                    barcode=row[2],
                    shippingDate=row[17],
                    product_id=row[0]
                )
                assort.append(rowAssort)
                product_assortiment[row[1]] = rowAssort
                if not row[33]:
                    row[33] = row[32]
                category.append(Category(
                    category0=row[31],
                    category=row[32],
                    subCategory=row[33],
                    categoryId=row[28],
                    categoryParentId=row[29],
                    product_id=row[0]
                ))
                created += 1
                createdvar += 1
            # if createdvar > 1000 or updatedvar > 1000:
            #     createdvar = 0
            #     updatedvar = 0
            #     Product.objects.bulk_create(products)
            #     Assortiment.objects.bulk_create(assort)
            #     Product.objects.bulk_update(productsToUpdate, fields=['retailPrice'])
            #     Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
            #     Category.objects.bulk_create(category)
            #     products = []
            #     assort = []
            #     category = []
            #     productsToUpdate = []
            #     assortToUpdate = []
    Product.objects.bulk_create(products)
    Assortiment.objects.bulk_create(assort)
    Product.objects.bulk_update(productsToUpdate, fields=['retailPrice'])
    Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
    Category.objects.bulk_create(category)
    subject = 'Обновление номенклатуры'
    message = f'{updated} товаров обновились в Магазине радости. {created} было добавлено '
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['leoevgeniy@gmail.com']
    send_mail(subject, message, email_from, recipient_list)
    return Response('Данные были загружены')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        retailPrice=0,
        brand='Sample Brand',
        countInStock=0,
        CollectionName='Sample category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def updateStock(request):
    destination = str(settings.BASE_DIR) + "/fullStock.csv"
    url = 'http://feed.p5s.ru/smartFeedBuild/63e62219e9d345.00449447'
    urllib.request.urlretrieve(url, destination)
    productsArr = {product.prodId: product for product in Product.objects.all()}
    product_assortiment = {p_assortiment.aID: p_assortiment for p_assortiment in Assortiment.objects.all()}
    productsToUpdate = []
    assortToUpdate = []
    updated = 0
    count = 0

    with open(destination, 'r', newline='', encoding='utf-8') as r:
        reader = csv.reader(r, delimiter=';', quotechar='"')
        for row in reader:
            if productsArr.get(row[0]):
                productsToUpdate.append(Product(_id=row[0], retailPrice=row[2]))
                if product_assortiment.get(row[1]):
                    assortToUpdate.append(
                        Assortiment(id=product_assortiment[row[1]].id, countInStock=row[3], shippingDate=row[4])
                    )
                updated += 1
                count += 1
            if count > 10000:
                count = 0
                Product.objects.bulk_update(productsToUpdate, fields=['retailPrice'])
                Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
                productsToUpdate = []
                assortToUpdate = []
        Product.objects.bulk_update(productsToUpdate, fields=['retailPrice'])
        Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
    subject = 'Информация об обновлении остатков'
    message = f'{updated} товаров обновились в Магазине радости. '
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['leoevgeniy@gmail.com']
    send_mail(subject, message, email_from, recipient_list)
    return Response('Данные обновлены!')


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def updateBySuperSaleProduct(request):
    # old = Product.objects.filter(isSuperSale=True)
    # olds = 0
    # created = 0
    # for i in old:
    #     i.isSuperSale = False
    #     i.superSaleCost = None
    #     i.save()
    #     olds += 1
    # url = "https://stripmag.ru/datafeed/p5s_sale.csv"
    # with requests.get(url, stream=True) as r:
    #     reader = csv.reader(codecs.iterdecode(r.iter_lines(), 'utf-8'), delimiter=';', quotechar='"')
    #     count = 0
    #     for row in reader:  # Handle each row here...
    #         if count > 0:
    #             if Product.objects.filter(prodId=row[0]).exists():
    #                 product = Product.objects.get(prodId=row[0])
    #                 product.isSuperSale = True
    #                 product.superSaleCost = row[4]
    #                 product.countInStock = row[5]
    #                 product.save()
    #                 created += 1
    #         count += 1
    product = Product.objects.filter(Q(assortiment__countInStock__gt=0)).distinct().order_by('?')[:1][0]
    photo = product.image1
    name = product.name
    description = product.description.replace('<br>', '\n')
    brand = ''
    collectionname = ''
    if product.brand != '':
        brand = '#'+product.brand.replace(' ', '')
    if product.CollectionName != '':
        collectionname = '#' + product.CollectionName.replace(' ', '')
    price = math.floor(product.retailPrice)
    prodId = product.prodId
    token = '6920212214:AAEaa9dPlxlOv6ZvgrptttRwLgv-W8ua9m8'
    chat_id = '-1001728234751'
    text = ''
    api = 'https://api.telegram.org/bot'
    method = api + token + '/sendPhoto'

    text = f'🔥 {name} ⚡️' \
           f' {description} \n' \
           f' {brand} {collectionname} \n'\
           f' {price}₽ \n'\
           f' [Заказать](https://lltoys.ru/products/{prodId})'


    mydata = {
        'chat_id': chat_id,
        'caption': text,
        'photo': photo,
        "parse_mode": "markdown",

    }
    req = requests.post(method, data=mydata)
    # req = requests.post(method + '?chat_id=' + chat_id + '&caption=' + text + '&photo=' + photo)
    # subject = 'Информация об обновлении Супер Скидки'
    # message = f'{olds} Удалено. {created} товаров по Супер скидке обновились в Магазине радости. '
    # email_from = settings.EMAIL_HOST_USER
    # recipient_list = ['leoevgeniy@gmail.com']
    # send_mail(subject, message, email_from, recipient_list)
    return Response('Данные обновлены!')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(prodId=pk)
    product.name = data['name']
    product.price = data['retailPrice']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Товар удален')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Изображение было загружено')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 review exist
    alreadyExist = product.review_set.filter(user=user).exists()
    if alreadyExist:
        content = {'detail': 'Вы уже оставили отзыв на этот товар!'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 No rating or 0

    elif data['rating'] == 0:
        content = {'detail': 'Пожалуйста оцените товар!'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 creating review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Отзыв оставлен')


