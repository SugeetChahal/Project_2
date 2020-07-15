# Import Dependencies
from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser
import os
import time

def init_browser():
    # Function for executable path for browser; conditions set for types of os
    if os.name=="nt":
        executable_path = {'executable_path': './chromedriver.exe'}
    else:
        executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    return Browser('chrome', **executable_path, headless=False)

def scrape_data():
    # Create a variable for the URL
    browser = init_browser()

    covid_data = {}

    # Request from the url and store
    covid_url = 'https://www.worldometers.info/coronavirus/country/us/'

    browser.visit(covid_url)
    time.sleep(5)

    # Create a Beautiful Soup object; parse with 'html.parser'
    news_html = browser.html
    news_soup = bs(news_html, 'html.parser')

    # Parse through the elements to collect the states data for the US (that way, the number will match with the found number of cases); create an array to loop through the web scraped data and append it
    covid_cases = news_soup.find('tbody').find_all('a', class_="mt_a")
    states = []
    for num in covid_cases:
        states.append(num.text)

    # Parse through the elements to collect the cases data for the US; create an array to loop through the web scraped data and append it
    covid_news = news_soup.find('tbody').find_all('td', class_='sorting_1')
    cases = []
    for news in covid_news:
        cases.append(int(news.text.replace(',', '')))

    # Parse through the elements to collect the states data for the US (that way, the number will match with the found number of cases); create an array to loop through the web scraped data and append it
    covid_deaths = news_soup.find('tbody').find_all('td')
    unfiltered_data = []
    for num in covid_deaths:
        unfiltered_data.append(num.text)

    # Create a counter and loop through the web scraped data
    counter = 15

    # Create a new list to hold the death cases
    deaths = []
    while counter > 0:
        deaths.append(int(unfiltered_data[counter].strip('\n').strip(' ').replace(',', '')))
        counter += 12
        if len(deaths) == len(states):
            break

    # Create a counter and loop through the web scraped data
    counter2 = 17

    # Create a new list to hold the death cases
    actives = []
    while counter2 > 0:
        actives.append(int(unfiltered_data[counter2].strip('\n').strip(' ').replace(',', '')))
        counter2 += 12
        if len(actives) == len(states):
            break

    # Erased the first index of the cases list because it's the total cases in the US
    cases.pop(0)

    # Create a recovered list to get the numbers from the cases, deaths and actives list
    recovered = []
    counter3 = 0
    while counter3 < len(cases):
        recovered.append(cases[counter3] - deaths[counter3] - actives[counter3])
        counter3 += 1

    # Store data to return
    covid_data["states"] = states
    covid_data["cases"] = cases
    covid_data["deaths"] = deaths
    covid_data["actives"] = actives
    covid_data["recovered"] = recovered

    browser.quit()
    
    return covid_data