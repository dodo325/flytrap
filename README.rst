==================
FlyTrap
==================

.. image:: https://img.shields.io/pypi/v/flytrap
   :alt: PyPI
.. image:: https://img.shields.io/pypi/pyversions/flytrap
   :alt: PyPI - Python Version
.. image:: https://readthedocs.org/projects/flytrap/badge/?version=latest
    :target: https://flytrap.readthedocs.io/en/latest/?badge=latest
    :alt: Documentation Status
.. image:: https://img.shields.io/github/license/dodo325/flytrap
   :alt: GitHub license
   :target: https://github.com/dodo325/flytrap/blob/main/LICENSE
.. image:: https://img.shields.io/badge/code%20style-black-000000
     :target: https://github.com/ambv/black
     :alt: Black code style

People tracker on the Internet. OSINT analysis and research tool by dodo325. Catch a user using your URL!


Installing
-----------

Install with pip or your favorite PyPI package manager.

.. code:: bash

        pip install flytrap


Local start or build
----------------------

Clone repository.

.. code:: bash

    git clone https://github.com/dodo325/flytrap.git

    cd flytrap

Run without build.

.. code:: bash

    pip install -r requirements/local.txt

    python -m flytrap

Build:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use pip:

.. code:: bash

    pip install ".[test]"

Or use Makefile:


.. code:: bash

    make reinstall-dev


Docker:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Build (local)

.. code:: bash

    docker build -t flytrap .


Run:

.. code:: bash

    docker run -it -v "$(pwd)"/.flytrap:/home/app/.flytrap/ -p 8080:8080 flytrap --help

Features
-----------

Detecters:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Client screen parameters
* GPU
* calculate CPU speed
* Speed Test
* detect Battery
* IP Geolocation
* User-Agent detection
* Network Info
* JS Version
* Social services detector
* Cookie tracker
* and other...

Tunneling and anonymize:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Ngrok tunnel
- Bit.ly shortener


Documentation
----------------------

https://flytrap.readthedocs.io/en/latest/


References
----------------------

Project inspired `jofpin/trape <https://github.com/jofpin/trape>`_.
