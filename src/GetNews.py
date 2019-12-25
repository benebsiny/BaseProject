from bs4 import BeautifulSoup
import requests
import json

urls = []

with open('./src/news-source.txt') as f:
    for i in f:
        urls.append(i.strip('\n'))

newsDicts = []
count = 0
for url in urls:
    req = requests.get(url)
    bs = BeautifulSoup(req.text, 'html.parser')

    newsDict = {}
    newsDict['id'] = count
    newsDict['title'] = bs.select('.news-title')[0].text
    newsDict['source'] = bs.select('.publisher')[0].text.strip()
    newsDict['time'] = bs.select('.date')[0].text
    newsDict['image'] = bs.select('.fig-cont.include-image img')[0]['src']
    content = ''
    for cont in bs.select('.article-content.news-content p'):
        content += cont.text
        content += '\n'

    newsDict['content'] = content

    newsDicts.append(newsDict)
    count += 1

with open('./src/news.json', 'w', encoding='utf8') as f:
    json.dump(newsDicts, f, indent=4, ensure_ascii=False)
