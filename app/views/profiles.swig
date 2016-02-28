{% extends 'layout.swig' %}

{% block content %}
<div class="row">
  <div class="medium-12 columns">
  	<table>
  		<thead>
  			<th>Gross Internal Area</th><th>BER</th><th>TER</th><th>Event Type</th><th>Occupancy Total</th><th>Total Volume</th><th>Annual Heating Load</th><th>Total Rooms</th>
  		</thead>
  		<tbody>
  			{% for item in profiles %}
  			    <tr>
             <td>{{item.gross_internal_area}}</td>
             <td>{{item.ber}}</td>
             <td>{{item.ter}}</td>
             <td>{{item.event_type }}</td>
             <td>{{item.occupancy_total}}</td>
             <td>{{item.total_volume}}</td>
             <td>{{item.annual_heating_load}}</td>
             <td>{{item.total_rooms}}</td><td>
  			    </tr>
  			{% endfor %}
  			
  		</tbody>
  	</table>
  </div>
</div>
{% endblock %}


