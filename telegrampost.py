import requests

from backend.base.models import Product


def send_telegram():
    product = Product.objects.filter(Q(assortiment__countInStock__gt=0) & Q(isNovelties__iexact=1)).distinct().order_by(
        '?')[:1]
    photo = 'https://feed.p5s.ru/images/big/0/1906.jpg'
    name = 'Вибромассажер №17 с рельефом - 19 см.'
    brand = product.brand
    collectionname = product.CollectionName
    description = 'В этом вибромассажёре прекрасно всё – и приятный на ощупь материал ЭКОй, и крупный рельеф, и изогнутый реалистичный ствол с гладкой головкой. <br><br> Проникая, благодаря форме, в самые труднодоступные уголки лона, игрушка порадует вас чувственным массажем и невероятной вибрацией. <br><br> Проникновение, ещё одно, и ещё…и вы на вершине блаженства!'
    token = '6920212214:AAEaa9dPlxlOv6ZvgrptttRwLgv-W8ua9m8'
    chat_id = '-1001728234751'
    text = ''
    api = 'https://api.telegram.org/bot'
    method = api + token + '/sendPhoto'

    text = f'🔥 {name} ⚡️' \
           f' {description} \n #{brand} #{collectionname}'
    mydata = {'chat_id': chat_id, 'caption': text, 'photo': photo}
    req = requests.post(method, data=mydata)
    # req = requests.post(method + '?chat_id=' + chat_id + '&caption=' + text + '&photo=' + photo)
    # req = requests.post('https://api.telegram.org/bot' + token + '/getUpdates')
    # req = requests.get('https://api.telegram.org/bot')


send_telegram()
