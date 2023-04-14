from abc import ABC

from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from base.models import Product, Order, OrderItem, ShippingAddress, Review, Profile, Payment, P5sOrder, Category, \
    Assortiment
from django.utils.translation import gettext_lazy as _


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class TokenObtainSerializerPhone(serializers.Serializer):
    username_field = get_user_model().USERNAME_FIELD

    default_error_messages = {
        "no_active_account": _("No active account found with the given credentials")
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.fields[self.username_field] = serializers.CharField()
        self.fields['phone_number'] = serializers.CharField()
        # self.fields["password"] = PasswordField()

    def validate(self, attrs):
        authenticate_kwargs = {
            # self.username_field: attrs[self.username_field],
            "phone_number": attrs["phone_number"].replace('+', ''),
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        # self.user = authenticate(**authenticate_kwargs)
        try:
            profile = Profile.objects.get(phone_number=authenticate_kwargs['phone_number'])
            self.user = User.objects.get(id=profile.user_id)
        except:
            return {'detail': 'Пользователя с таким Email не зарегистрирован'}

        return super(TokenObtainSerializerPhone, self).validate(attrs)

    # @classmethod
    # def get_token(cls, user):
    #     return cls.token_class.for_user(user)


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    phone_number = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'phone_number']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get_phone_number(self, obj):
        phones = Profile.objects.get(user_id=obj.id).phone_number
        return str(phones)


class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField(read_only=True)
    phone_number = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'user_id', 'phone_number']

    def get_user_id(self, obj):
        return obj.user_id

    def get_phone_number(self, obj):
        phone_number = obj.phone_number
        return phone_number


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    phone_number = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'phone_number', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def get_phone_number(self, obj):
        phones = Profile.objects.get(user_id=obj).phone_number
        # serializer = ProfileSerializer(phones, many=False)
        return str(phones)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class AssortimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assortiment
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    assortiment = serializers.SerializerMethodField(read_only=True)
    categories = serializers.SerializerMethodField(read_only=True)
    colors = serializers.SerializerMethodField(read_only=True)
    availability = serializers.SerializerMethodField(read_only=True)
    countInStock = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

    def get_assortiment(self, obj):
        assortiment = obj.assortiment_set.all()
        serializer = AssortimentSerializer(assortiment, many=True)
        return serializer.data

    def get_categories(self, obj):
        categories = obj.category_set.all()
        serializer = CategorySerializer(categories, many=True)
        return serializer.data

    def get_colors(self, obj):
        def findColor(arr, color):
            for dict in arr:
                for key in dict:
                    if key == color:
                        return True

        def addSize(arr, color, size):
            for dict in arr:
                for key in dict:
                    if key == color:
                        dict[key].append(size)
            return arr

        assortiment = obj.assortiment_set.all()
        colors = []
        for item in assortiment:
            if item.countInStock > 0:
                if item.color:
                    if not colors:
                        colors.append({item.color: [item.size]})
                    else:
                        if findColor(colors, item.color):
                            addSize(colors, item.color, item.size)
                        else:
                            colors.append({item.color: [item.size]})
                else:
                    colors.append({item.color: [item.size]})
        return colors

    def get_countInStock(self, obj):
        assortiment = obj.assortiment_set.all()
        countInStock = 0
        for item in assortiment:
            if item.countInStock > 0:
                countInStock = item.countInStock
        return countInStock

    def get_availability(self, obj):
        assortiment = obj.assortiment_set.all()
        colors = []
        availability = []
        for item in assortiment:
            if item.countInStock > 0:
                if item.color not in colors:
                    colors.append(item.color)
                    tempcolor = item.color
                    availability.append({tempcolor: [item.size]})
                else:
                    for dict in availability:
                        if dict == item.color:
                            availability[dict].append(item.size)
        return availability


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False

        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


class P5sOrderSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    # ExtOrderID_id = serializers.IntegerField(read_only=True)
    # ResultStatus = serializers.IntegerField(read_only=True)
    # ResultStatusMsg = serializers.CharField(max_length=200)
    # timestamp = serializers.DateTimeField(auto_now_add=False)
    # orderID = serializers.IntegerField(allow_blank=True)
    # ExtDateOfAdded = serializers.DateTimeField(auto_now_add=False)
    # ExtOrderPaid = serializers.CharField(max_length=128)
    # ExtOrderTotal = serializers.CharField(max_length=128)
    # ExtDeliveryCost = serializers.CharField( max_length=128)
    # dsDeliveryPriceTo = serializers.CharField(max_length=128)
    # dsDeliveryPriceBack = serializers.CharField(max_length=128)
    # dsDeliveryAgentMoney = serializers.CharField(max_length=128)
    # dsDelivery = serializers.CharField(max_length=128)
    # dsDeliveryDate = serializers.DateTimeField(auto_now_add=False)
    # dsComments = serializers.CharField(max_length=256)
    # dsPickPointID = serializers.CharField(max_length=256)
    # dsFullAddress = serializers.CharField(max_length=256)
    # orderDate = serializers.DateTimeField(auto_now_add=False)
    # pickupDate = serializers.DateTimeField( auto_now_add=False)
    status = serializers.CharField(max_length=128)

    # orderTotal = serializers.CharField(max_length=128)
    # postDataCode = serializers.CharField(max_length=128)
    # postDataStatusName = serializers.CharField(max_length=128)
    # postDataTrackingUrl = serializers.CharField(max_length=256)
    # StatusHistoryId = serializers.CharField(max_length=128)
    # StatusHistoryDate = serializers.DateTimeField(auto_now_add=False)
    # StatusHistoryLabel = serializers.CharField(max_length=256)
    # MoneyHistoryID = serializers.CharField(max_length=128)
    # MoneyHistoryMoney = serializers.CharField(max_length=128)
    # MoneyHistoryDescription = serializers.CharField(max_length=256)
    # MoneyHistorytype = serializers.CharField(max_length=128)
    # MoneyHistoryDate = serializers.DateTimeField(auto_now_add=False)
    # totalSum = serializers.DecimalField(max_digits=7, decimal_places=2, allow_blank=True)
    # ExtTotalSum = serializers.DecimalField(max_digits=7, decimal_places=2, allow_blank=True)
    # ExtDeliveryCost = serializers.DecimalField(max_digits=7, decimal_places=2, allow_blank=True)
    # messages = serializers.CharField(max_length=200, allow_blank=True)
    class Meta:
        model = P5sOrder
        fields = '__all__'
