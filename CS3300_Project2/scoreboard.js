var scale = 5;
  var scoreHeight = 35*scale;
  var scoreWidth = scoreHeight*2;
  var scoreSVG = d3.select("#board")
                  .append("svg")
                  .attr("id", "scoreboard")
                  .attr("height", scoreHeight)
                  .attr("width", scoreWidth);

  // LABELS
  scoreSVG.append("text").attr("x", 1*scale).attr("y", (scoreHeight/9)+1.1*scale).style("fill", "white").text("BAL");
  scoreSVG.append("text").attr("x", (scoreWidth*3/4)+2.5*scale).attr("y", (scoreHeight/9)+1.1*scale).style("fill", "white").text("SF");
  scoreSVG.append("text").attr("x", 1*scale).attr("y", (scoreHeight*2/3)).style("fill", "white").text("DOWN");
  scoreSVG.append("text").attr("x", (scoreWidth/4)).attr("y", (scoreHeight*2/3)).style("fill", "white").text("TO GO");
  scoreSVG.append("text").attr("x", (scoreWidth/2)).attr("y", (scoreHeight*2/3)).style("fill", "white").text("BALL ON");
  scoreSVG.append("text").attr("x", (scoreWidth*3/4)+5*scale).attr("y", (scoreHeight*2/3)).style("fill", "white").text("QTR.");

  // TOP ROW OF BOXES
  var home = scoreSVG.append("rect").attr("x", 1.5*scale).attr("y", (scoreHeight*2/9)).attr("height", (scoreHeight/5)).attr("width", (scoreWidth/6)).style("color", "black").attr("id", "homeScore");
  var time = scoreSVG.append("rect").attr("x", (scoreWidth/3)+2.5*scale).attr("y", (scoreHeight*2/9)).attr("height", (scoreHeight/5)).attr("width", (scoreWidth/4)).style("color", "black").attr("id", "time");
  var guest = scoreSVG.append("rect").attr("x", (scoreWidth*3/4)+4*scale).attr("y", (scoreHeight*2/9)).attr("height", (scoreHeight/5)).attr("width", (scoreWidth/6)).style("color", "black").attr("id", "guestScore");

  // BALL POSSESSION
  scoreSVG.append("rect").attr("x", (scoreWidth/4)+0.7*scale).attr("y", (scoreHeight/3)-1.2*scale).attr("height", (1.5*scale)).attr("width", 3*scale).style("color", "black").attr("id", "homePossession");
  scoreSVG.append("rect").attr("x", (scoreWidth*3/4)-4*scale).attr("y", (scoreHeight/3)-1.2*scale).attr("height", (1.5*scale)).attr("width", 3*scale).style("color", "black").attr("id", "guestPossession");

  // BOTTOM ROW OF BOXES
  scoreSVG.append("rect").attr("x", 1.5*scale).attr("y", (scoreHeight*7/9)-1.1*scale).attr("height", (scoreHeight/5)).attr("width", (scoreWidth/6)).style("color", "black").attr("id", "down");
  scoreSVG.append("rect").attr("x", (scoreWidth/4)+1.1*scale).attr("y", (scoreHeight*7/9)-1.1*scale).attr("height", (scoreHeight/5)).attr("width", (scoreWidth/6)).style("color", "black").attr("id", "togo");
  scoreSVG.append("rect").attr("x", (scoreWidth/2)+3.5*scale).attr("y", (scoreHeight*7/9)-1.1*scale).attr("height", (scoreHeight/5)).attr("width", (scoreWidth/6)).style("color", "black").attr("id", "ballOn");
  scoreSVG.append("rect").attr("x", (scoreWidth*3/4)+4*scale).attr("y", (scoreHeight*7/9)-1.1*scale).attr("height", (scoreHeight/5)).attr("width", (scoreWidth/6)).style("color", "black").attr("id", "qtr");

  // DATA

  //scoreSVG.selectAll("text").data(info).enter();

  // CHANGE TEXT AS STEP THROUGH TIME
  var timeLabel = scoreSVG.append("text")
                              .attr("x", (scoreWidth/2))
                              .attr("y", (scoreHeight/3)+1.2*scale)
                              .style("text-anchor", "middle")
                              .style("fill", "white")
                              .text("15:00");
  // home score
  var homeScore = scoreSVG.append("text")
                              .attr("x", (scoreWidth/9))
                              .attr("y", (scoreHeight/3)+1.2*scale)
                              .style("text-anchor", "middle")
                              .style("fill", "white")
                              .text("00"); 
  // guest score
  var guestScore = scoreSVG.append("text")
                              .attr("x", (scoreWidth*8/9))
                              .attr("y", (scoreHeight/3)+1.2*scale)
                              .style("text-anchor", "middle")
                              .style("fill", "white")
                              .text("00"); 
  // down
  var downLabel = scoreSVG.append("text")
                              .attr("x", (scoreWidth/9))
                              .attr("y", (scoreHeight*6/7)+1.2*scale)
                              .style("text-anchor", "middle")
                              .style("fill", "white")
                              .text("1"); 
  // to go
  var togoLabel = scoreSVG.append("text")
                              .attr("x", (scoreWidth/3)+1.2*scale)
                              .attr("y", (scoreHeight*6/7)+1.2*scale)
                              .style("text-anchor", "middle")
                              .style("fill", "white")
                              .text("10"); 
  // ball on
  var ballonLabel = scoreSVG.append("text")
                              .attr("x", (scoreWidth*2/3)-2*scale)
                              .attr("y", (scoreHeight*6/7)+1.2*scale)
                              .style("text-anchor", "middle")
                              .style("fill", "white")
                              .text("50"); 
  // qtr
  var qtrLabel = scoreSVG.append("text")
                              .attr("x", (scoreWidth*8/9))
                              .attr("y", (scoreHeight*6/7)+1.2*scale)
                              .style("text-anchor", "middle")
                              .style("fill", "white")
                              .text("1"); 

  var updateScoreboard= function(prevPlay, currentPlay) {
    var min = 0
    var currentMin = prevPlay["min"]
    var currentSec = prevPlay["sec"]
    if (currentMin % 15 == 0) {
      if (currentSec == "00") {
        currentMin = 15;
      } else {
        currentMin = "00"
      }
      if (currentSec < 10) {
        currentSec = "0"+currentSec
      }
    } else {
      currentMin = currentMin % 15;
      if (currentMin < 10) {
        currentMin = "0"+currentMin
      } 
      if (currentSec < 10) {
        currentSec = "0"+currentSec
      }
    }
    timeLabel.text(currentMin+":"+currentSec)
    if (currentPlay["off"] === "BAL") {
      homeScore.text(currentPlay["offscore"]);
      guestScore.text(currentPlay["defscore"]);
    } else {
      homeScore.text(currentPlay["defscore"]);
      guestScore.text(currentPlay["offscore"]);
    }
    downLabel.text(currentPlay["down"]);
    togoLabel.text(currentPlay["togo"]);
    ballonLabel.text(currentPlay["ydline"]);
    qtrLabel.text(currentPlay["qtr"]);
  }