""" TODO: use https://github.com/dodo325/shorty_url """

import json
from typing import List, Optional

import httpx


class BitlyShortener:
    __api_url = "https://api-ssl.bitly.com/v4/"

    def _get_headers(self) -> dict:
        return {
            'Authorization': f'Bearer {self._token}',
            'Content-Type': 'application/json',
        }

    def get_groups(self) -> List[dict]:
        r = httpx.get(self.__api_url + "groups", headers=self._get_headers())
        data = r.json()
        return data["groups"]

    def __init__(self, token: str):
        self._token = token

    def short(self, long_url: str, group_guid: Optional[str] = None, domain="bit.ly") -> str:
        group_guid = group_guid or self.get_groups()[0]['guid']
        data = {"long_url": long_url, "group_guid": group_guid, "domain": domain}
        data = json.dumps(data)
        r = httpx.post(self.__api_url + 'shorten', headers=self._get_headers(), data=data)

        if r.status_code != 201:
            raise RuntimeError(f"Could not shorten! response: {r.text}")

        response_data = r.json()
        return response_data['link']

    def delete(self, url: str):
        url = url.replace('http://', '')
        url = url.replace('https://', '')

        r = httpx.delete(self.__api_url + 'bitlinks/' + url, headers=self._get_headers())
        if r.status_code != 200:
            raise RuntimeError(f"Could not delete! response: {r.text}")
