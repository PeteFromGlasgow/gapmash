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
  			    <tr>
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
