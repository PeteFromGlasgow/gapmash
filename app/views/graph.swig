{% extends 'layout.swig' %}

{% block content %}
<div class="row">
  <div class="medium-12 columns">
    <h3>Designed vs Built</h3>
    <ul class="menu">
    <li><a id="ber" href="#n">BER</a></li>
    <li><a id="ter" href="#n">TER</a></li>
    <li><a id="annual_load" href="#n">Annual Heating Load</a></li>
    </ul>
  	<div id="chart">
       
    </div>
  </div>
</div>
  <script type="text/javascript">


    $(document).ready(function(){
      var chart;
      $.get("/bercomparison", function(red, bod){
      
        chart = c3.generate({
          data: {
              bindto: "#chart",
              columns: red,
              types: {
                  data1: 'area-spline',
                  data2: 'area-spline'
                  // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
              },
              groups: [['data1', 'data2']]
          }
        });

        $("#ber").click(function(){
          $.get("/bercomparison", function(red, bod){
            chart = c3.generate({
            data: {
                bindto: "#chart",
                columns: red,
                types: {
                    data1: 'area-spline',
                    data2: 'area-spline'
                    // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
                },
                groups: [['data1', 'data2']]
            }
            });
          });
        });

        $("#ter").click(function(){
          $.get("/tercomparison", function(red, bod){
            chart = c3.generate({
            data: {
                bindto: "#chart",
                columns: red,
                types: {
                    data1: 'area-spline',
                    data2: 'area-spline'
                    // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
                },
                groups: [['data1', 'data2']]
            }
            });
          });

        });

        $("#annual_load").click(function(){
          $.get("/loadcomparison", function(red, bod){
            chart = c3.generate({
            data: {
                bindto: "#chart",
                columns: red,
                types: {
                    data1: 'area-spline',
                    data2: 'area-spline'
                    // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
                },
                groups: [['data1', 'data2']]
            }
            });
          });
        });
    })

    })
    
    </script>
{% endblock %}


