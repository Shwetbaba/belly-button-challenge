
d3.json('/Belly-Button-Biodiversity/data/samples.json').then(({names})=>{

    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    show();
})
 

function optionChanged() {
    show();
};


function show() {
    d3.json('/Belly-Button-Biodiversity/data/samples.json').then(({metadata,samples})=>{
        var sel = d3.select('select').node().value;
        var meta = metadata.filter(obj=>obj.id == sel)[0];
        var sample = samples.filter(obj=>obj.id == sel)[0];

        d3.select('.panel-body').html('');

        Object.entries(meta).forEach(([key,val])=>{
            d3.select('.panel-body').append('h5').text(key.toUpperCase()+': '+val)
        });
        console.log(sample);


        var barData = [
            {
              x: sample.sample_values.slice(0,10).reverse(),
              y: sample.otu_ids.slice(0,10).reverse().map(x=>'OTU '+ x),
              type: 'bar',
              orientation: 'h'
            }
          ];

          var chartLayout ={
              title: "Top 10 OTUs"
          };
          
          Plotly.newPlot('bar', barData, chartLayout);


        var otu_ids = sample.otu_ids;
        console.log(otu_ids);
        var otu_labels = sample.otu_labels;
        console.log(otu_labels);
        var sample_val = sample.sample_values;
        console.log(sample_val);

        var bubbleChart = {
            title: "Becteria culture",
            hovermode: "closet",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"}
        };

        var bubbleData = [{
            x: otu_ids,
            y: sample_val,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_val,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];
    
        Plotly.newPlot("bubble", bubbleData);


        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: meta.wfreq,
              title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubes Per Week"},
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [0, 9] } }
            }
          ];
          
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gauge', data, layout);

  
    });
}