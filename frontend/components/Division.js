import React from "react";

import Team from "./Team.js";

const Division = function(props){
  let header;
  switch(props.division){
    case "alc":
    header = "AL CENTRAL";
    break;
    case "ale":
    header = "AL EAST";
    break;
    case "alw":
    header = "AL WEST";
    break;
    case "nlc":
    header = "NL CENTRAL";
    break;
    case "nle":
    header = "NL EAST";
    break;
    case "nlw":
    header = "NL WEST";
    break;
  }
  return(
    <div id={props.division}>
      <p>{header}</p>
      <Team obj={props.league.teamRecords[0]} />
      <Team obj={props.league.teamRecords[1]} />
      <Team obj={props.league.teamRecords[2]} />
      <Team obj={props.league.teamRecords[3]} />
      <Team obj={props.league.teamRecords[4]} />
    </div>
  );
}

module.exports = Division;
