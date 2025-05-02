import React from "react";
import "./balance.css";

export default function Balance(props) {
  const squad = props.squad || {};

  const attackers = squad.attackers || [];
  const midfielders = squad.midfielders || [];
  const defenders = squad.defenders || [];
  const goalkeepers = squad.goalkeepers || [];
  const transferList = squad.transferList || [];

  const totalArrivals = [
    ...attackers,
    ...midfielders,
    ...defenders,
    ...goalkeepers,
    ...transferList,
  ].filter((player) => player?.buy).length;

  const totalExits = transferList.filter((player) => player?.sell).length;

  const totalArrivalsValue = [
    ...attackers,
    ...midfielders,
    ...defenders,
    ...goalkeepers,
    ...transferList,
  ]
    .filter((player) => player?.buy && !isNaN(parseFloat(player?.value)))
    .reduce((acc, player) => acc + parseFloat(player.value), 0);

  const totalExitsValue = transferList
    .filter(
      (player) => player?.sell && !isNaN(parseFloat(player?.valueTransfer))
    )
    .reduce((acc, player) => acc + parseFloat(player.valueTransfer), 0);

  const totalBalance = totalExitsValue - totalArrivalsValue;
  const balanceStyle =
    totalBalance < 0 ? props.colorArrivals : props.colorExits;

  return (
    <>
      <div className="containerInfoSquadGeralTransferBalance">
        <div className="numberGeralTransfers">
          <span className="colorDifferent">Contratações:</span> {totalArrivals}
        </div>
        <div className="Money" style={props.colorArrivals}>
          €{totalArrivalsValue.toFixed(1)}M
        </div>
      </div>
      <div className="containerInfoSquadGeralTransferBalance">
        <div className="numberGeralTransfers">
          <span className="colorDifferent">Vendas:</span> {totalExits}
        </div>
        <div className="Money" style={props.colorExits}>
          €{totalExitsValue.toFixed(1)}M
        </div>
      </div>
      <div className="containerInfoSquadGeralTransferBalance">
        Balanço Total
        <div className="Money" style={balanceStyle}>
          €{Math.abs(totalBalance).toFixed(1)}M
        </div>
      </div>
    </>
  );
}
