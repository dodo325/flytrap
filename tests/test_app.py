from flask_testing import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from flytrap.app import create_app as flytrap_app


class TestBaseRederect(LiveServerTestCase):
    def setUp(self):
        """Explicitly create a Chrome browser instance."""
        self.browser = webdriver.Firefox()
        self.addCleanup(self.browser.quit)

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

    def test_base_rederect(self):
        url = self.get_server_url()
        print("server: ", url)
        self.browser.get(url)
        WebDriverWait(self.browser, 5).until(EC.title_is("Example Domain"))
        self.assertIn('Example Domain', self.browser.title)
