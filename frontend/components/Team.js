import React from "react";

const Team = function(props){
  return (
    <div className="teamlogo" id={props.obj.team.id}>
      <img
        src={"images/" + props.obj.team.id + ".png"}
        alt={props.obj.team.id + "logo"}
        />
      <p className="score">
        W: {props.obj.leagueRecord.wins} L: {props.obj.leagueRecord.losses}
        <br /> GB: {props.obj.gamesBack}
      </p>
    </div>
  )
}

module.exports = Team;
