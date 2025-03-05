from flask import Flask, jsonify, request
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

app = Flask(__name__)

# Configurar Selenium con opciones para evitar detección
def get_driver():
    options = Options()
    options.add_argument("--headless")  # Ejecutar en segundo plano
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("start-maximized")
    options.add_argument("disable-infobars")
    options.add_argument("--disable-extensions")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    return driver

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q')
    if not query:
        return jsonify({"error": "No search query provided"}), 400

    driver = get_driver()
    driver.get(f"https://www.amazon.com/s?k={query.replace(' ', '+')}")

    time.sleep(3)  # Esperar para cargar la página

    products = []
    items = driver.find_elements(By.XPATH, "//div[contains(@class,'s-main-slot')]/div")
    
    for item in items[:10]:  # Extraer los primeros 10 resultados
        try:
            title = item.find_element(By.XPATH, ".//span[@class='a-size-medium']").text
            price = item.find_element(By.XPATH, ".//span[@class='a-price-whole']").text
            link = item.find_element(By.XPATH, ".//a[@class='a-link-normal']").get_attribute("href")
            image = item.find_element(By.XPATH, ".//img").get_attribute("src")

            products.append({
                "title": title,
                "price": f"${price}",
                "link": link,
                "image": image
            })
        except:
            continue

    driver.quit()
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
