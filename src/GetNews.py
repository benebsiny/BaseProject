from bs4 import BeautifulSoup
import requests
import json



url = "https://today.line.me/tw/pc/article/%E4%B8%96%E7%95%8C%E9%81%BA%E7%94%A2%E3%80%8C%E6%9C%80%E7%BE%8E%E5%B0%8F%E9%8E%AE%E3%80%8D%E7%81%AB%E7%81%BD%EF%BC%814%E6%9C%A8%E5%B1%8B%E5%B9%BE%E5%85%A8%E6%AF%80-7gX13m"

req = requests.get(url)
bs = BeautifulSoup(req.text, 'html.parser')

newsDict = {}
newsDict['id'] = 5
newsDict['title'] = bs.select('.news-title')[0].text
newsDict['source'] = bs.select('.publisher')[0].text.strip()
newsDict['time'] = bs.select('.date')[0].text
newsDict['image'] = bs.select('.fig-cont.include-image img')[0]['src']
content = ''
for cont in bs.select('.article-content.news-content p'):
    content += cont.text
    content += '\n'

newsDict['content'] = content

print(newsDict)

with open('./src/news.json', 'a', encoding='utf8') as file:
    json.dump(newsDict, file, indent=4, ensure_ascii=False)
    # print(jd)
    # file.write(jd)
