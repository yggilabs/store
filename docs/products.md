---
layout: default
title: Home
---

<main class="site__content">
  
## Products
{% for product in site.products %}

### [{{ product.label }}]({{ site.github.baseurl }}{{ product.url }})

{{ product.stock.price.value }} {{ product.stock.price.currency }}
{% endfor %}
</main>
