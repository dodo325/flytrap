#!/usr/bin/env python


# https://godatadriven.com/blog/a-practical-guide-to-using-setup-py/

import codecs
import os

from setuptools import find_packages, setup

#
try:
    # pip >=20
    from pip._internal.network.session import PipSession
    from pip._internal.req import parse_requirements
except ImportError:
    try:
        # 10.0.0 <= pip <= 19.3.1
        from pip._internal.download import PipSession
        from pip._internal.req import parse_requirements
    except ImportError:
        # pip <= 9.0.3
        from pip.download import PipSession
        from pip.req import parse_requirements


def get_requirements(file_name):
    # with codecs.open(file_name) as requirements_txt:
    requirements = list(parse_requirements(file_name, session=PipSession()))
    try:
        return [str(ir.req) for ir in requirements]
    except AttributeError:
        return [str(ir.requirement) for ir in requirements]


about = {}

with codecs.open(os.path.join("flytrap", "__init__.py")) as f:
    exec(f.read(), about)

with codecs.open("README.rst") as readme_file:
    readme = readme_file.read()

with codecs.open("HISTORY.rst") as history_file:
    history = history_file.read()


test_requirements = get_requirements("requirements/local.txt")

requirements = get_requirements("requirements/base.txt")


extras = {"tests": test_requirements}


setup(
    name=about["__title__"],
    version=about["__version__"],
    author=about["__author__"],
    author_email=about["__email__"],
    description=about["__summary__"],
    long_description=readme + "\n\n" + history,
    long_description_content_type="text/x-rst",
    license=about["__license__"],
    url=about["__url__"],
    keywords=[
        "flytrap",
    ],
    python_requires=">=3.8",
    classifiers=[
        'Environment :: Console',
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Natural Language :: English",
        'Programming Language :: Python',
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        'Programming Language :: Python :: Implementation :: PyPy',
        'Topic :: Software Development',
    ],
    entry_points={
        "console_scripts": [
            "flytrap=flytrap.cli:app",
        ],
    },
    install_requires=requirements,
    tests_require=test_requirements,
    extras_require=extras,
    include_package_data=True,
    packages=find_packages(include=["flytrap", "flytrap.*"]),
    zip_safe=False,
)
