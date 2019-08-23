// csv를 가져와서 변수로 정의함. 이게 전역변수가 아니라서 d3.csv(){요기요기}안에서 기록되어야 함. 
d3.csv("DiscountCodebyWeek.csv", function (data) {
  discountData = data.map(function (d) {
    return +d.DiscountCode * 5;
  });
  weekData = data.map(function (d) {
    return +d.WeekInYear;
  });
  //데이터가 불러오는지 확인
  console.log(discountData);
  console.log(weekData);
  console.log(data);

  //그래프의 시각적인 영역을 담당함. 수치를 변수에 담아 사용함.
  var w = 750;
  var h = 200;
  var padding = 20;
  var barChartIncrements = 1;

  var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("fill", "steelblue")

  svg.selectAll("rect")
    .data(discountData)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return i * (w / discountData.length);
    })
    .attr("y", function (d, i) {
      return h - d - padding - 2;
    })
    .attr("width", w / discountData.length - barChartIncrements)
    .attr("height", function (d) {
      return d
    })
  //레이블링 영역
  svg.selectAll("text")
    .data(discountData)
    .enter()
    .append("text")
    .text(function (d) {
      return d / 5;
    })
    .attr("x", function (d, i) {
      return i * (w / discountData.length);
    })
    .attr("y", function (d) {
      return h - d - padding - 4;;
    })
    .attr("font-size", "10px")
    .attr("text-anchor", "left")
    .style("fill", "black")
  //x축에 한 해의 주를 표현하는 스케일링
  var xScale = d3.scale.linear()
    .range([0, w])
    .domain([1, d3.max(weekData)]);
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
  svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr("class", "axis")
    .call(xAxis)

})