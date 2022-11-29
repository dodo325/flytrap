import pytest
from flask_testing import LiveServerTestCase
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from flytrap.app import create_app as flytrap_app


class TestBaseRederect(LiveServerTestCase):
    def create_app(self, port=8943):
        app = flytrap_app(
            "http://www.example.com",
            port=port,
        )
        app.config['TESTING'] = True
        # Default port is 5000
        app.config['LIVESERVER_PORT'] = port
        self._port = port
        # Default timeout is 5 seconds
        app.config['LIVESERVER_TIMEOUT'] = 10
        return app

    @pytest.fixture(autouse=True)
    def selenium_browser(self, selenium, benchmark):
        self.browser = selenium
        self.benchmark = benchmark

    def test_base_rederect(self):
        url = self.get_server_url()
        print("server: ", url)
        self.browser.get(url)
        self.benchmark(WebDriverWait(self.browser, 5).until, EC.title_is("Example Domain"))
        self.assertIn('Example Domain', self.browser.title)


# class TestNgrokRederect(TestBaseRederect):
#     def create_app(self, port=8943):
#         app = flytrap_app(
#             "http://www.example.com",
#             port=port,
#             use_ngrok=True
#         )
#         app.config['TESTING'] = True
#         # Default port is 5000
#         app.config['LIVESERVER_PORT'] = port
#         self._port = port
#         # Default timeout is 5 seconds
#         app.config['LIVESERVER_TIMEOUT'] = 10

#         return app

#     def test_base_rederect_ngrok(self):
#         url = self.app.config["NGROK_URL"]
#         print("server: ", url)
#         self.browser.get(url)
#         WebDriverWait(self.browser, 5).until(EC.title_is("Example Domain"))
#         self.assertIn('Example Domain', self.browser.title)
