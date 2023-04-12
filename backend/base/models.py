from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from phone_field import PhoneField
from django.contrib.auth.models import AbstractUser


# class CustomUser(User):
#     phone_number = models.CharField(max_length=200, null=True, blank=True, help_text='Номер телефона для уточнения заказа и адреса доставки')


def photo_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/company_<name>/
    return 'product_{0}/{1}'.format(instance.articul, filename)


# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    phone_number = PhoneField(blank=True, help_text='Номер телефона для уточнения заказа и адреса доставки')
    password_change_link = models.CharField(max_length=200, null=True, blank=True)
    is_password_changed = models.BooleanField(default=False)
    password_changeAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'Profile for user {}'.format(self.user.username)


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    batteries = models.CharField(max_length=200, null=True, blank=True)
    pack = models.CharField(max_length=200, null=True, blank=True)
    material = models.CharField(max_length=200, null=True, blank=True)
    CollectionName = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    discount = models.CharField(max_length=200, null=True, blank=True)
    stopPromo = models.CharField(max_length=200, null=True, blank=True)
    retailPrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    baseRetailPrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    wholePrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    baseWholePrice = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    lenght = models.CharField(max_length=200, null=True, blank=True)
    diameter = models.CharField(max_length=200, null=True, blank=True)

    sklad = models.CharField(max_length=200, null=True, blank=True)
    brutto = models.CharField(max_length=200, null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    prodId = models.CharField(max_length=200, null=True, blank=True)

    vendorCode = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    imageSmall = models.URLField(null=True, blank=True)
    image1 = models.URLField(null=True, blank=True)
    image2 = models.URLField(null=True, blank=True)
    image3 = models.URLField(null=True, blank=True)
    image4 = models.URLField(null=True, blank=True)
    image5 = models.URLField(null=True, blank=True)
    image6 = models.URLField(null=True, blank=True)
    image7 = models.URLField(null=True, blank=True)
    image8 = models.URLField(null=True, blank=True)
    image9 = models.URLField(null=True, blank=True)
    image10 = models.URLField(null=True, blank=True)
    image11 = models.URLField(null=True, blank=True)
    image12 = models.URLField(null=True, blank=True)
    image13 = models.URLField(null=True, blank=True)
    image14 = models.URLField(null=True, blank=True)
    image15 = models.URLField(null=True, blank=True)
    image16 = models.URLField(null=True, blank=True)
    image17 = models.URLField(null=True, blank=True)
    image18 = models.URLField(null=True, blank=True)
    image19 = models.URLField(null=True, blank=True)
    image20 = models.URLField(null=True, blank=True)
    image21 = models.URLField(null=True, blank=True)
    image22 = models.URLField(null=True, blank=True)
    isSuperSale = models.BooleanField(default=False)
    isNovelties = models.BooleanField(default=False)
    isBestSeller = models.BooleanField(default=False)
    superSaleCost = models.CharField(max_length=200, null=True, blank=True)

    def get_category(self, obj):
        category = obj.category_set.all()
        return category

    def get_assortiment(self, obj):
        assortiment = obj.assortiment_set.all()
        return assortiment

    def __str__(self):
        return self.name


class Category(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    category0 = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    subCategory = models.CharField(max_length=200, null=True, blank=True)
    categoryId = models.IntegerField(null=True, blank=True, default=0)
    categoryParentId = models.IntegerField(null=True, blank=True, default=0)


class Assortiment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    aID = models.CharField(max_length=200, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    color = models.CharField(max_length=200, null=True, blank=True)
    colorUrl = models.URLField(max_length=600, null=True, blank=True)
    size = models.CharField(max_length=200, null=True, blank=True)
    barcode = models.CharField(max_length=200, null=True, blank=True)
    shippingDate = models.CharField(max_length=200, null=True, blank=True)


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    comments = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.createdAt)


class P5sOrder(models.Model):
    ResultStatus = models.IntegerField(null=True, blank=True, default=0)
    ResultStatusMsg = models.CharField(max_length=200, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    orderID = models.IntegerField(null=True, blank=True, default=0)
    ExtOrderID = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    ExtDateOfAdded = models.DateTimeField(verbose_name='дата размещения заказа в вашем интернет-магазине', null=True,
                                          auto_now_add=False)
    ExtOrderPaid = models.CharField(
        verbose_name='статус оплаты заказа. Может иметь два значения:1 - «заказ оплачен Мерчанту»0 - «оплата заказа при получении»',
        max_length=128, null=True)
    ExtOrderTotal = models.CharField(verbose_name='число. Стоимость товаров в заказе для конечного получателя',
                                     max_length=128, null=True)
    ExtDeliveryCost = models.CharField(verbose_name='число. Стоимость доставки для конечного получателя',
                                       max_length=128, null=True)
    dsDeliveryPriceTo = models.CharField(verbose_name='Себестоимость доставки до покупателя', max_length=128, null=True)
    dsDeliveryPriceBack = models.CharField(verbose_name='Себестоимость возврата заказа от покупателя', max_length=128,
                                           null=True)
    dsDeliveryAgentMoney = models.CharField(verbose_name='Сумма агентского вознаграждения', max_length=128, null=True)
    dsDelivery = models.CharField(
        verbose_name="способ доставки. Целое число. Варианты значений:1 - Наш курьер по Москве2 - Почта РФ4 - Самовывоз Москва, м. Автозаводская5 - PickPoint7 - Курьер по Санкт-Петербург (Maxi-post). - не поддерживается с мая 2018 года8 - Курьер по России (DPD до двери)10 - Курьер по России (СДЭК до двери)",
        max_length=128, null=True)
    dsDeliveryDate = models.DateTimeField(verbose_name='пожелания покупателя по дате/времени доставки заказа',
                                          null=True, auto_now_add=False)
    dsComments = models.CharField(verbose_name='комментарии покупателя к заказу', max_length=256, null=True)
    dsPickPointID = models.CharField(verbose_name='дентификатор постомата или ПВЗ PickPoint.', max_length=256,
                                     null=True)
    dsFullAddress = models.CharField(verbose_name='полный адрес постомата или ПВЗ PickPoint.', max_length=256,
                                     null=True)
    orderDate = models.DateTimeField(verbose_name=' дата и время размещения заказа у нас в системе.', null=True,
                                     auto_now_add=False)
    pickupDate = models.DateTimeField(verbose_name='плановая дата отгрузки заказа с нашего склада.', null=True,
                                      auto_now_add=False)
    status = models.CharField(verbose_name='текущий статус заказа. Целое число', max_length=128, null=True)
    orderTotal = models.CharField(verbose_name='Оптовая стоимость товаров в заказе', max_length=128, null=True)
    postDataCode = models.CharField(verbose_name='идентификаторв отправления в службе доставки. ', max_length=128,
                                    null=True)
    postDataStatusName = models.CharField(verbose_name='статус отправления в службе доставки. ', max_length=128,
                                          null=True)
    postDataTrackingUrl = models.CharField(
        verbose_name='адрес, где можно получить информацию о текущем состоянии отправления.', max_length=256, null=True)
    StatusHistoryId = models.CharField(verbose_name='идентификатор статуса заказа.', max_length=128, null=True)
    StatusHistoryDate = models.DateTimeField(verbose_name='дата и время когда заказ был переведён в этот статус',
                                             null=True, auto_now_add=False)
    StatusHistoryLabel = models.CharField(verbose_name='текстовое значение статуса', max_length=256, null=True)
    MoneyHistoryID = models.CharField(verbose_name='идентификатор финансовой операции у нас в системе', max_length=128,
                                      null=True)
    MoneyHistoryMoney = models.CharField(verbose_name='сумма операции в рубля', max_length=128, null=True)
    MoneyHistoryDescription = models.CharField(verbose_name='текстовое описание операции', max_length=256, null=True)
    MoneyHistorytype = models.CharField(verbose_name='тип операции', max_length=128, null=True)
    MoneyHistoryDate = models.DateTimeField(verbose_name='дата и время выполнения операции', null=True,
                                            auto_now_add=False)
    totalSum = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    ExtTotalSum = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    ExtDeliveryCost = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    messages = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.order)


class P5sOrderItem(models.Model):
    p5sOrder = models.ForeignKey(P5sOrder, on_delete=models.SET_NULL, null=True)
    prodID = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    ds_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    itemcost = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    aID = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return str(self.name)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    size = models.CharField(max_length=50, null=True, blank=True)
    color = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    aID = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    street = models.CharField(max_length=200, null=True, blank=True)
    house = models.CharField(max_length=200, null=True, blank=True)
    flat = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalcode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippmentMethod = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)


class Payment(models.Model):
    payment_id = models.CharField(verbose_name='Bank Payment ID', max_length=36, null=True)
    order = models.OneToOneField(Order, verbose_name='Income Reference', on_delete=models.SET_NULL, null=True)
    amount = models.CharField(verbose_name='Amount in russian currency', max_length=128, null=True)
    income_amount = models.CharField(verbose_name='Delivered Amount in russian currency', max_length=128, null=True)
    confirmation_url = models.CharField(verbose_name='Confirmation URL', max_length=128, null=True)
    description = models.CharField(verbose_name='Order Description', max_length=128, null=True)
    payment_method = models.CharField(verbose_name='Payment Method', max_length=256, null=True)
    payment_method_id = models.CharField(verbose_name='Bank Payment method ID', max_length=256, null=True)
    payment_method_saved = models.BooleanField(verbose_name='Is saved for auto-payment', default=False)
    payment_method_title = models.CharField(verbose_name='Title of payment method', max_length=128)
    refundable = models.BooleanField(default=False)
    payment_card_data_expiry_year = models.CharField(verbose_name='YYYY', max_length=256, null=True)
    payment_card_data_expiry_month = models.CharField(verbose_name='MM', max_length=256, null=True)
    payment_card_data_card_type = models.CharField(verbose_name='Card type', max_length=256, null=True)
    payment_card_data_issuer_country = models.CharField(verbose_name='Country code', max_length=256, null=True)
    payment_card_data_issuer_name = models.CharField(verbose_name='Bank name', max_length=256, null=True)
    payment_card_data_source = models.CharField(verbose_name='source', max_length=256, null=True)
    captured_at = models.DateTimeField(verbose_name='Confirmed At', null=True, auto_now_add=False)
    created_at = models.DateTimeField(verbose_name='Confirmed At', null=True, auto_now_add=False)
    expires_at = models.DateTimeField(verbose_name='Free cancel till', null=True, auto_now_add=False)
    test = models.BooleanField(verbose_name='Is test operation', default=False)
    refunded_amount = models.CharField(verbose_name='Amount in russian currency', max_length=128, null=True)
    terminal_key = models.CharField(verbose_name='TerminalKey', max_length=256, null=True)
    success = models.BooleanField(verbose_name='Is status changed', default=False)
    status = models.CharField(verbose_name='Status', max_length=128, default='CREATED')
    is_paid = models.BooleanField(default=False)
    auth_code = models.CharField(verbose_name='3-D secure data', max_length=256, null=True)
    three_d_secure_applied = models.BooleanField(default=False)
    rrn = models.CharField(verbose_name='Retrieval Reference Number', max_length=256, null=True)
    merchant_customer_id = models.CharField(verbose_name='User Id', max_length=200, null=True)
    is_status_changed = models.BooleanField(verbose_name='Is status changed', default=False)
    error_code = models.CharField(verbose_name='ErrorCode', max_length=128, null=True, blank=True)
    message = models.CharField(verbose_name='Error message', max_length=256, null=True, blank=True)
    details = models.CharField(verbose_name='Error details', max_length=512, null=True, blank=True)


class YMProduct(models.Model):
    prodId = models.CharField(max_length=200, null=True, blank=True)
    aID = models.CharField(max_length=200, null=True, blank=True)
    barcode = models.CharField(max_length=200, null=True, blank=True)
    productName = models.CharField(max_length=200, null=True, blank=True)
    vendorCode = models.CharField(max_length=200, null=True, blank=True)
    vendor = models.CharField(max_length=200, null=True, blank=True)
    vendorId = models.CharField(max_length=200, null=True, blank=True)
    vendorCountry = models.CharField(max_length=200, null=True, blank=True)
    vendorDescription = models.CharField(max_length=200, null=True, blank=True)
    prodCountry = models.CharField(max_length=200, null=True, blank=True)
    retailPrice = models.CharField(max_length=200, null=True, blank=True)
    baseRetailPrice = models.CharField(max_length=200, null=True, blank=True)
    wholePrice = models.CharField(max_length=200, null=True, blank=True)
    baseWholePrice = models.CharField(max_length=200, null=True, blank=True)
    userPrice = models.CharField(max_length=200, null=True, blank=True)
    discount = models.CharField(max_length=200, null=True, blank=True)
    stock = models.CharField(max_length=200, null=True, blank=True)
    shippingDate = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(max_length=1024, null=True, blank=True)
    brutto = models.CharField(max_length=200, null=True, blank=True)
    bruttoKg = models.CharField(max_length=200, null=True, blank=True)
    batteries = models.CharField(max_length=200, null=True, blank=True)
    pack = models.CharField(max_length=200, null=True, blank=True)
    material = models.CharField(max_length=200, null=True, blank=True)
    length = models.CharField(max_length=200, null=True, blank=True)
    diameter = models.CharField(max_length=200, null=True, blank=True)
    collection = models.CharField(max_length=200, null=True, blank=True)
    images = models.CharField(max_length=200, null=True, blank=True)
    customCatalogueId = models.CharField(max_length=200, null=True, blank=True)
    customCatalogueParentId = models.CharField(max_length=200, null=True, blank=True)
    customCatalogueName = models.CharField(max_length=200, null=True, blank=True)
    category1 = models.CharField(max_length=200, null=True, blank=True)
    category2 = models.CharField(max_length=200, null=True, blank=True)
    category3 = models.CharField(max_length=200, null=True, blank=True)
    category4 = models.CharField(max_length=200, null=True, blank=True)
    category5 = models.CharField(max_length=200, null=True, blank=True)
    categoryPath = models.CharField(max_length=200, null=True, blank=True)
    color = models.CharField(max_length=200, null=True, blank=True)
    colorUrl = models.CharField(max_length=200, null=True, blank=True)
    size = models.CharField(max_length=200, null=True, blank=True)
    novelties = models.CharField(max_length=200, null=True, blank=True)
    superSale = models.CharField(max_length=200, null=True, blank=True)
    bestseller = models.CharField(max_length=200, null=True, blank=True)
    prodUrl = models.CharField(max_length=200, null=True, blank=True)
    function = models.CharField(max_length=200, null=True, blank=True)
    addFunction = models.CharField(max_length=200, null=True, blank=True)
    vibration = models.CharField(max_length=200, null=True, blank=True)
    volume = models.CharField(max_length=200, null=True, blank=True)
    modelYear = models.CharField(max_length=200, null=True, blank=True)
    imgStatus = models.CharField(max_length=200, null=True, blank=True)
    readyToGo = models.CharField(max_length=200, null=True, blank=True)
    p5sStock = models.CharField(max_length=200, null=True, blank=True)
    stopPromo = models.CharField(max_length=200, null=True, blank=True)
    bruttoLength = models.CharField(max_length=200, null=True, blank=True)
    bruttoWidth = models.CharField(max_length=200, null=True, blank=True)
    bruttoHeight = models.CharField(max_length=200, null=True, blank=True)
    currency = models.CharField(max_length=200, null=True, blank=True)
    mpRule = models.CharField(max_length=200, null=True, blank=True)
    manual = models.CharField(max_length=200, null=True, blank=True)
    composition = models.CharField(max_length=200, null=True, blank=True)
    genderSpecific = models.CharField(max_length=200, null=True, blank=True)
    img1 = models.CharField(max_length=200, null=True, blank=True)
    img2 = models.CharField(max_length=200, null=True, blank=True)
    img3 = models.CharField(max_length=200, null=True, blank=True)
    img4 = models.CharField(max_length=200, null=True, blank=True)
    img5 = models.CharField(max_length=200, null=True, blank=True)
    img6 = models.CharField(max_length=200, null=True, blank=True)
    img7 = models.CharField(max_length=200, null=True, blank=True)
    img8 = models.CharField(max_length=200, null=True, blank=True)
    img9 = models.CharField(max_length=200, null=True, blank=True)
    img10 = models.CharField(max_length=200, null=True, blank=True)
