---
layout: default
title: Home
---

## Products

{% for product in products %}
### [{{ product.label }}]({{ site.github.baseurl }}{{ post.url }})

{{ product.stock.price.value }} {{ product.stock.price.currency }}
{% endfor %}
