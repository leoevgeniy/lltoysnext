import urllib

from django import db
from rest_framework.decorators import api_view
from django.conf import settings
import csv
from rest_framework.response import Response

from base.models import Product, Category, Assortiment
from django.core.mail import send_mail


# Create your views here.
@api_view(['GET'])
# @permission_classes([IsAdminUser])

def migrateProduct(request):
    destination = str(settings.BASE_DIR) + "/fullTotal.csv"
    # url = 'http://feed.p5s.ru/smartFeedBuild/63986a106b1f49.24135419'
    # urllib.request.urlretrieve(url, destination)
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
        allProducts = Product.objects.all()
        allAssortiment = Assortiment.objects.all()
        productsArr = {product.prodId: product for product in allProducts}
        product_assortiment = {p_assortiment.aID: p_assortiment for p_assortiment in allAssortiment}
        db.close_old_connections()
        print(len(productsArr), len(product_assortiment))
        for row in reader:

            if productsArr.get(row[0]):
                productsToUpdate.append(Product(_id=row[0], retailPrice=row[14]))
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
            if createdvar > 20000 or updatedvar > 20000:
                print(len(products), len(assort), len(productsToUpdate), len(assortToUpdate))
                createdvar = 0
                updatedvar = 0
                Product.objects.bulk_create(products)
                Assortiment.objects.bulk_create(assort)
                Product.objects.bulk_update(productsToUpdate, fields=['retailPrice'])
                Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
                Category.objects.bulk_create(category)
                db.close_old_connections()
                print('sql closed')
                products = []
                assort = []
                category = []
                productsToUpdate = []
                assortToUpdate = []
    print('FINAL', len(products), len(assort), len(productsToUpdate), len(assortToUpdate))
    Product.objects.bulk_create(products)
    Assortiment.objects.bulk_create(assort)
    Product.objects.bulk_update(productsToUpdate, fields=['retailPrice'])
    Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
    Category.objects.bulk_create(category)
    db.close_old_connections()
    print('final sql closed')
    subject = 'Обновление номенклатуры'
    message = f'{updated} товаров обновились в Магазине радости. {created} было добавлено '
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['leoevgeniy@gmail.com']
    send_mail(subject, message, email_from, recipient_list)
    return Response('Данные были загружены')


@api_view(['GET'])
def updateStock(request):
    destination = str(settings.BASE_DIR) + "/fullStock.csv"
    url = 'http://feed.p5s.ru/smartFeedBuild/63e62219e9d345.00449447'
    urllib.request.urlretrieve(url, destination)
    productsArr = {product.prodId: product for product in Product.objects.all()}
    product_assortiment = {p_assortiment.aID: p_assortiment for p_assortiment in Assortiment.objects.all()}
    print(len(productsArr), len(product_assortiment))
    db.close_old_connections()
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
            if count > 20000:
                count = 0
                Product.objects.bulk_update(productsToUpdate, fields=['retailPrice'])
                Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
                print(len(productsArr), len(product_assortiment))
                db.close_old_connections()

                productsToUpdate = []
                assortToUpdate = []
        Product.objects.bulk_update(productsToUpdate, fields=['retailPrice'])
        Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
        print(len(productsArr), len(product_assortiment))
        db.close_old_connections()

    subject = 'Информация об обновлении остатков'
    message = f'{updated} товаров обновились в Магазине радости. '
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['leoevgeniy@gmail.com']
    send_mail(subject, message, email_from, recipient_list)
    return Response('Данные обновлены!')
