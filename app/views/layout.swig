<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>{{ title }}</title>
  <link rel="stylesheet" href="/css/style.css">
  {% if ENV_DEVELOPMENT %}
    <script src="http://localhost:35729/livereload.js"></script>
  {% endif %}
</head>
<body>

<div class="top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu" data-dropdown-menu>
      <li class="menu-text">{{title}}</li>
      <li><a href="#">Add Entry</a></li>
  	  <li><a href="#">View Dataset</a></li>
      <li><a href="#">Analyse</a></li>
    </ul>
  </div>
</div>
    </div>
  {% block content %}{% endblock %}

  <script type="text/javascript"></script>
    <script src="public/components/jquery/dist/jquery.min.js"></script>
    <script src="public/components/foundation/js/foundation.min.js"></script>
    <script src="public/components/foundation.min.js"></script>
</body>
</html>
