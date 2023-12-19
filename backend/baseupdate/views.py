import datetime
import math
import urllib
import xml.etree.ElementTree as etree

from django import db
import requests
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
        allProducts = Product.objects.all()
        allAssortiment = Assortiment.objects.all()
        productsArr = {product.prodId: product for product in allProducts}
        product_assortiment = {p_assortiment.aID: p_assortiment for p_assortiment in allAssortiment}
        db.close_old_connections()
        for row in reader:

            if productsArr.get(row[0]):
                if row[42] == '1' and row[40] == '1':
                    productsToUpdate.append(
                        Product(_id=row[0], retailPrice=row[14], isBestSeller=True, isNovelties=True))
                elif row[42] == '1' and row[40] == '0':

                    productsToUpdate.append(
                        Product(_id=row[0], retailPrice=row[14], isBestSeller=True, isNovelties=False))
                elif row[40] == '1' and row[42] == '0':
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
            if createdvar > 20000 or updatedvar > 20000:
                createdvar = 0
                updatedvar = 0
                Product.objects.bulk_create(products)
                Assortiment.objects.bulk_create(assort)
                Product.objects.bulk_update(productsToUpdate, fields=['retailPrice', 'isBestSeller', 'isNovelties'])
                Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
                Category.objects.bulk_create(category)
                db.close_old_connections()
                products = []
                assort = []
                category = []
                productsToUpdate = []
                assortToUpdate = []
    Product.objects.bulk_create(products)
    Assortiment.objects.bulk_create(assort)
    Product.objects.bulk_update(productsToUpdate, fields=['retailPrice', 'isBestSeller', 'isNovelties'])
    Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
    Category.objects.bulk_create(category)
    db.close_old_connections()
    subject = 'Обновление номенклатуры'
    message = f'{updated} товаров обновились в Магазине радости. {created} было добавлено '
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['leoevgeniy@gmail.com']
    send_mail(subject, message, email_from, recipient_list)
    return Response('Данные были загружены')


@api_view(['GET'])
def updateStock(request):
    # destination = str(settings.BASE_DIR) + "/fullStock.csv"
    # url = 'http://feed.p5s.ru/smartFeedBuild/63e62219e9d345.00449447'
    # urllib.request.urlretrieve(url, destination)
    # productsArr = {product.prodId: product for product in Product.objects.all()}
    # product_assortiment = {p_assortiment.aID: p_assortiment for p_assortiment in Assortiment.objects.all()}
    # db.close_old_connections()
    # productsToUpdate = []
    # assortToUpdate = []
    # updated = 0
    # count = 0
    #
    # with open(destination, 'r', newline='', encoding='utf-8') as r:
    #     reader = csv.reader(r, delimiter=';', quotechar='"')
    #     for row in reader:
    #         if productsArr.get(row[0]):
    #             productsToUpdate.append(Product(_id=row[0], retailPrice=row[2]))
    #             if product_assortiment.get(row[1]):
    #                 assortToUpdate.append(
    #                     Assortiment(id=product_assortiment[row[1]].id, countInStock=row[3], shippingDate=row[4])
    #                 )
    #             updated += 1
    #             count += 1
    #         if count > 20000:
    #             count = 0
    #             Product.objects.bulk_update(productsToUpdate, fields=['retailPrice'])
    #             Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
    #             db.close_old_connections()
    #
    #             productsToUpdate = []
    #             assortToUpdate = []
    #     Product.objects.bulk_update(productsToUpdate, fields=['retailPrice'])
    #     Assortiment.objects.bulk_update(assortToUpdate, fields=['countInStock', 'shippingDate'])
    #     db.close_old_connections()
    product = Product.objects.filter(assortiment__countInStock__gt=2).distinct().order_by('?')[:1][0]
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
    category = Category.objects.filter(product_id=prodId)[0]
    print(category.category)
    cat = ''
    subcat = ''
    if category.category:
        cat = '#' + category.category.replace(' ', '')
    if category.subCategory:
        subcat = '#' + category.subCategory.replace(' ', '').replace(',', '')
    text = f'🔥 {name} ⚡️' \
           f' {description} \n' \
           f' {brand} {collectionname} {cat} {subcat}\n'\
           f' {price}₽ \n'\
           f' [Заказать](https://lltoys.ru/products/{prodId})'


    mydata = {
        'chat_id': chat_id,
        'caption': text,
        'photo': photo,
        "parse_mode": "markdown",

    }
    req = requests.post(method, data=mydata)
    # subject = 'Информация об обновлении остатков'
    # message = f'{updated} товаров обновились в Магазине радости. '
    # email_from = settings.EMAIL_HOST_USER
    # recipient_list = ['leoevgeniy@gmail.com']
    # send_mail(subject, message, email_from, recipient_list)
    return Response('Данные обновлены!')


@api_view(['GET'])
def createsitemap(request):
    catalog = {}
    categories = Category.objects.all()
    sitemaproot = etree.Element('urlset')
    sitemaproot.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    staticRoutes = etree.SubElement(sitemaproot, 'url')
    loc = etree.SubElement(staticRoutes, 'loc')
    loc.text = 'https://lltoys.ru/'
    lastmod = etree.SubElement(staticRoutes, 'lastmod')
    lastmod.text = datetime.datetime.now().isoformat()
    changefreq = etree.SubElement(staticRoutes, 'changefreq')
    changefreq.text = 'daily'
    priority = etree.SubElement(staticRoutes, 'priority')
    priority.text = '1.0'
    staticRoutesabout = etree.SubElement(sitemaproot, 'url')
    loc = etree.SubElement(staticRoutesabout, 'loc')
    loc.text = 'https://lltoys.ru/about'
    lastmod = etree.SubElement(staticRoutesabout, 'lastmod')
    lastmod.text = datetime.datetime.now().isoformat()
    changefreq = etree.SubElement(staticRoutesabout, 'changefreq')
    changefreq.text = 'daily'
    priority = etree.SubElement(staticRoutesabout, 'priority')
    priority.text = '0.1'
    staticRoutesDelivery = etree.SubElement(sitemaproot, 'url')
    loc = etree.SubElement(staticRoutesDelivery, 'loc')
    loc.text = 'https://lltoys.ru/delivery-curerom'
    lastmod = etree.SubElement(staticRoutesDelivery, 'lastmod')
    lastmod.text = datetime.datetime.now().isoformat()
    changefreq = etree.SubElement(staticRoutesDelivery, 'changefreq')
    changefreq.text = 'daily'
    priority = etree.SubElement(staticRoutesDelivery, 'priority')
    priority.text = '0.3'
    staticRoutesDelivery = etree.SubElement(sitemaproot, 'url')
    loc = etree.SubElement(staticRoutesDelivery, 'loc')
    loc.text = 'https://lltoys.ru/delivery-pickpoint'
    lastmod = etree.SubElement(staticRoutesDelivery, 'lastmod')
    lastmod.text = datetime.datetime.now().isoformat()
    changefreq = etree.SubElement(staticRoutesDelivery, 'changefreq')
    changefreq.text = 'daily'
    priority = etree.SubElement(staticRoutesDelivery, 'priority')
    priority.text = '0.3'
    staticRoutesDelivery = etree.SubElement(sitemaproot, 'url')
    loc = etree.SubElement(staticRoutesDelivery, 'loc')
    loc.text = 'https://lltoys.ru/delivery-self'
    lastmod = etree.SubElement(staticRoutesDelivery, 'lastmod')
    lastmod.text = datetime.datetime.now().isoformat()
    changefreq = etree.SubElement(staticRoutesDelivery, 'changefreq')
    changefreq.text = 'daily'
    priority = etree.SubElement(staticRoutesDelivery, 'priority')
    priority.text = '0.3'
    staticRoutesDelivery = etree.SubElement(sitemaproot, 'url')
    loc = etree.SubElement(staticRoutesDelivery, 'loc')
    loc.text = 'https://lltoys.ru/delivery-pochtarf'
    lastmod = etree.SubElement(staticRoutesDelivery, 'lastmod')
    lastmod.text = datetime.datetime.now().isoformat()
    changefreq = etree.SubElement(staticRoutesDelivery, 'changefreq')
    changefreq.text = 'daily'
    priority = etree.SubElement(staticRoutesDelivery, 'priority')
    priority.text = '0.3'
    staticRoutesRegister = etree.SubElement(sitemaproot, 'url')
    loc = etree.SubElement(staticRoutesRegister, 'loc')
    loc.text = 'https://lltoys.ru/inputpd?redirect=/'
    lastmod = etree.SubElement(staticRoutesRegister, 'lastmod')
    lastmod.text = datetime.datetime.now().isoformat()
    changefreq = etree.SubElement(staticRoutesRegister, 'changefreq')
    changefreq.text = 'daily'
    priority = etree.SubElement(staticRoutesRegister, 'priority')
    priority.text = '0.8'
    staticRoutesHit = etree.SubElement(sitemaproot, 'url')
    loc = etree.SubElement(staticRoutesHit, 'loc')
    loc.text = 'https://lltoys.ru/search?bestsellers=1'
    lastmod = etree.SubElement(staticRoutesHit, 'lastmod')
    lastmod.text = datetime.datetime.now().isoformat()
    changefreq = etree.SubElement(staticRoutesHit, 'changefreq')
    changefreq.text = 'daily'
    priority = etree.SubElement(staticRoutesHit, 'priority')
    priority.text = '1.0'
    staticRoutesHit = etree.SubElement(sitemaproot, 'url')
    loc = etree.SubElement(staticRoutesHit, 'loc')
    loc.text = 'https://lltoys.ru/search?supersale=1'
    lastmod = etree.SubElement(staticRoutesHit, 'lastmod')
    lastmod.text = datetime.datetime.now().isoformat()
    changefreq = etree.SubElement(staticRoutesHit, 'changefreq')
    changefreq.text = 'daily'
    priority = etree.SubElement(staticRoutesHit, 'priority')
    priority.text = '1.0'
    staticRoutesHit = etree.SubElement(sitemaproot, 'url')
    loc = etree.SubElement(staticRoutesHit, 'loc')
    loc.text = 'https://lltoys.ru/search?novelties=1'
    lastmod = etree.SubElement(staticRoutesHit, 'lastmod')
    lastmod.text = datetime.datetime.now().isoformat()
    changefreq = etree.SubElement(staticRoutesHit, 'changefreq')
    changefreq.text = 'daily'
    priority = etree.SubElement(staticRoutesHit, 'priority')
    priority.text = '1.0'
    for category in categories:
        if category.subCategory and (category.category not in catalog):
            catalog[category.category] = [category.subCategory]
            sitecategory = etree.SubElement(sitemaproot, 'url')
            loc = etree.SubElement(sitecategory, 'loc')
            if not category.subCategory and category.category:
                category.subCategory = category.category
            loc.text = f'https://lltoys.ru/category/{category.category}'
            lastmod = etree.SubElement(sitecategory, 'lastmod')
            lastmod.text = datetime.datetime.now().isoformat()
            changefreq = etree.SubElement(sitecategory, 'changefreq')
            changefreq.text = 'daily'
            priority = etree.SubElement(sitecategory, 'priority')
            priority.text = '1.0'
        else:
            if category.subCategory and (category.subCategory not in catalog[category.category]):
                catalog[category.category].append(category.subCategory)
                sitecategory = etree.SubElement(sitemaproot, 'url')
                loc = etree.SubElement(sitecategory, 'loc')
                if not category.subCategory and category.category:
                    category.subCategory = category.category
                loc.text = f'https://lltoys.ru/category/{category.category}/{category.subCategory}'
                lastmod = etree.SubElement(sitecategory, 'lastmod')
                lastmod.text = datetime.datetime.now().isoformat()
                changefreq = etree.SubElement(sitecategory, 'changefreq')
                changefreq.text = 'daily'
                priority = etree.SubElement(sitecategory, 'priority')
                priority.text = '1.0'
    if not settings.DEBUG:
        etree.ElementTree(sitemaproot).write(
            "/home/l/leoevgrv/lltoys.ru/public_html/sitemap.xml",
            xml_declaration=True,
            encoding='UTF-8',
        )
    else:
        etree.ElementTree(sitemaproot).write(
            "./public_html/sitemap.xml",
            xml_declaration=True,
            encoding='UTF-8',
        )
    subject = 'Информация создании файла itemap.xml'
    message = f'Файл создан'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['leoevgeniy@gmail.com']
    send_mail(subject, message, email_from, recipient_list)
    return Response('Данные обновлены!')


@api_view(['GET'])
def createyml(request):
    categoriesModels = Category.objects.all()
    catalog = {}
    for category in categoriesModels:
        if category.subCategory and (category.category not in catalog):
            catalog[category.category] = [category.subCategory]
        else:
            if category.subCategory and (category.subCategory not in catalog[category.category]):
                catalog[category.category].append(category.subCategory)
    root = etree.Element("yml_catalog")
    root.set('date', datetime.datetime.now(datetime.timezone.utc).astimezone().isoformat())
    appt = etree.SubElement(root, "shop")

    # создаем дочерний суб-элемент.
    name = etree.SubElement(appt, "name")
    name.text = "lltoys.ru"

    company = etree.SubElement(appt, "company")
    company.text = "lltoys.ru"

    url = etree.SubElement(appt, "url")
    url.text = "https://lltoys.ru"

    currencies = etree.SubElement(appt, 'currencies')
    currency = etree.SubElement(currencies, 'currency')
    currency.set('id', 'RUR')
    currency.set('rate', '1')
    categories = etree.SubElement(appt, 'categories')
    catIndex = 1
    categoryToUpdate = []
    count = 0
    for cat in catalog:
        category = etree.SubElement(categories, 'category')
        category.set('id', str(catIndex))
        category.text = cat
        subCatIndex = catIndex + 1
        catDBall = categoriesModels.filter(category=cat)
        for subCat in catalog[cat]:

            subCategory = etree.SubElement(categories, 'category')
            subCategory.set('id', str(subCatIndex))
            subCategory.set('parentId', str(catIndex))
            if not subCat:
                subCat = cat
            subCategory.text = subCat
            for dbCat in catDBall:
                if dbCat.subCategory == subCat:
                    categoryToUpdate.append(Category(id=dbCat.id, categoryId=str(subCatIndex), categoryParentId=str(catIndex)))
                    count += 1
            subCatIndex += 1
            if count > 5000:
                count = 0
                Category.objects.bulk_update(categoryToUpdate, fields=['categoryId', 'categoryParentId'])
                db.close_old_connections()
                categoryToUpdate = []
        catIndex = subCatIndex
    Category.objects.bulk_update(categoryToUpdate, fields=['categoryId', 'categoryParentId'])
    db.close_old_connections()
    delivery = etree.SubElement(appt, 'delivery')
    delivery.text = 'true'
    adult = etree.SubElement(appt, 'adult')
    adult.text = 'true'
    offers = etree.SubElement(appt, 'offers')
    offerCount = 0
    products = Product.objects.all()
    categoriesModels = Category.objects.all()
    assortiment = Assortiment.objects.all()
    print('categ')
    db.close_old_connections()
    count = 0
    for product in products:
        countInStock = 0
        assort = assortiment.filter(product_id=product._id)
        for i in assort:
            if i.countInStock > 0 and countInStock < i.countInStock:
                countInStock = i.countInStock
        if countInStock > 2:
            try:
                categoryForturbo = categoriesModels.filter(product_id=product._id)
                i = categoryForturbo[0]
                if i.categoryId != '0':
                    offer = etree.SubElement(offers, 'offer', id=str(product._id))
                    name = etree.SubElement(offer, 'name')
                    name.text = product.name
                    vendor = etree.SubElement(offer, 'vendor')
                    vendor.text = product.brand
                    vendorCode = etree.SubElement(offer, 'vendorCode')
                    vendorCode.text = product.vendorCode
                    adultitem = etree.SubElement(offer, 'adult')
                    adultitem.text = 'true'
                    pickup = etree.SubElement(offer, 'pickup')
                    pickup.text = 'true'
                    url = etree.SubElement(offer, 'url')
                    url.text = 'http://lltoys.ru/products/' + str(product._id)
                    price = etree.SubElement(offer, 'price')
                    price.text = str(product.retailPrice)
                    currencyId = etree.SubElement(offer, 'currencyId')
                    currencyId.text = 'RUR'

                    categoryId = etree.SubElement(offer, 'categoryId')
                    categoryId.text = str(i.categoryId)
                    picture = etree.SubElement(offer, 'picture')
                    picture.text = product.image1
                    if product.image2:
                        picture2 = etree.SubElement(offer, 'picture')
                        picture2.text = product.image2
                    if product.image3:
                        picture3 = etree.SubElement(offer, 'picture')
                        picture3.text = product.image3
                    if product.image4:
                        picture4 = etree.SubElement(offer, 'picture')
                        picture4.text = product.image4
                    if product.image5:
                        picture5 = etree.SubElement(offer, 'picture')
                        picture5.text = product.image5
                    if product.image6:
                        picture6 = etree.SubElement(offer, 'picture')
                        picture6.text = product.image6
                    if product.image7:
                        picture7 = etree.SubElement(offer, 'picture')
                        picture7.text = product.image7
                    if product.image8:
                        picture8 = etree.SubElement(offer, 'picture')
                        picture8.text = product.image8
                    description = etree.SubElement(offer, 'description')
                    description.text = product.description
                    sales_notes = etree.SubElement(offer, 'sales_notes')
                    sales_notes.text = 'Предоплата или оплата при получении'
                    paramcount = 0
                    for i in assort:
                        if paramcount < 199:
                            if i.color:
                                param = etree.SubElement(offer, 'param', name='Цвет')
                                param.text = i.color
                            if i.size:
                                param = etree.SubElement(offer, 'param', name='Размер')
                                param.text = i.size
                            paramcount += 1

                    weight = etree.SubElement(offer, 'weight')
                    weight.text = str(abs(float(product.brutto)))
                    offerCount += 1
            except:
                continue
        count +=1
        db.close_old_connections()
        if count > 40:
            break
        print(count)
    etree.dump(root)

    if settings.DEBUG:
        etree.ElementTree(root).write(
            "./public_html/ymlcatalog.yml",
            xml_declaration=True,
            encoding='UTF-8',
        )
        etree.ElementTree(root).write(
            "./public_html/turbocatalog.yml",
            xml_declaration=True,
            encoding='UTF-8',
        )
    else:
        etree.ElementTree(root).write(
            "/home/l/leoevgrv/lltoys.ru/public_html/ymlcatalog.yml",
            xml_declaration=True,
            encoding='UTF-8',
        )
        etree.ElementTree(root).write(
            "/home/l/leoevgrv/lltoys.ru/public_html/turbocatalog.yml",
            xml_declaration=True,
            encoding='UTF-8',
        )
    xmlFile = etree.tostring(root, encoding='unicode')
    myfile = open("ymlcatalog.yml", "w", encoding='utf-8')
    myfile.write(xmlFile)
    myfile.close()
    subject = 'Информация создании файла catalog.yml'
    message = f'Файл создан'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['leoevgeniy@gmail.com']
    send_mail(subject, message, email_from, recipient_list)

    return Response('Файлы выгрузки созданы')
