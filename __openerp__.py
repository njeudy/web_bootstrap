# -*- coding: utf-8 -*-

{
    "name" : 'Add Bootstrap from Twitter',
    "version" : "0.1",
    "depends" : ['base',],
    "author" : "Nicolas JEUDY <njeudy@txs.fr>",
    "installable" : True,
    "active" : False,
    "data": [
    ],
    "css": [
        'static/src/bootstrap/css/bootstrap.css',
        'static/src/bootstrap/css/bootstrap-responsive.min.css',
        'static/src/css/base.css',
    ],
    "js": [
        'static/src/bootstrap/js/bootstrap.min.js',
        'static/src/bootstrap/js/holder.js',
        'static/src/js/*.js',
    ],
    "qweb": [
	'static/src/xml/*.xml',
    ],
    "sequence": 90,
}

