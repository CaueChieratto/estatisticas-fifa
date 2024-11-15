import React from "react";
import "./Modal.css";
import { MdQuestionMark } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { TbArrowBack } from "react-icons/tb";

export default function DeleteSeason(props) {
  return (
    <div onClick={props.closeModalDelete} className="containerModal">
      <div className="cardModal" onClick={(e) => e.stopPropagation()}>
        <div className="container">
          <div className="containerDelete">
            <div className="delete">
              <div className="textDelete">
                {props.textDelete}
                <div className="question">
                  <MdQuestionMark size={25} />
                </div>
              </div>
            </div>
            <div className="wrappeDeletedButtons">
              <div
                onClick={props.closeModalDelete}
                id="back"
                className="textButtonDelete"
              >
                <div className="back">
                  <TbArrowBack size={22}></TbArrowBack>
                </div>
                voltar
              </div>
              <div
                onClick={props.delete}
                id="delete"
                className="textButtonDelete"
              >
                apagar
                <div className="danger">
                  <CgDanger color="red" size={22}></CgDanger>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
