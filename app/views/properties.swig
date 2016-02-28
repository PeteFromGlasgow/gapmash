{% extends 'layout.swig' %}

{% block content %}
<div class="row">
  <div class="medium-12 columns">
  	<table>
  		<thead>
  			<th>Programme Name</th><th>Project Name</th><th>Property Code</th>
  		</thead>
  		<tbody>
  			{% for item in properties %}
  				{% if item.profile_count == 0 %}
	  			    <tr style="cursor: pointer; background:pink" onclick="window.location.href = '/properties/{{item.id}}/profiles'">
  			    {% else %}
	  			    <tr style="cursor: pointer;" onclick="window.location.href = '/properties/{{item.id}}/profiles'">
  				{% endif %}
  			    	<td>{{item.programme_name}}</td>
  			    	<td>{{item.project_name}}</td>
  			    	<td>{{item.property_code}}</td>
  			    </tr>
  			{% endfor %}
  			
  		</tbody>
  	</table>
  </div>
</div>
{% endblock %}
