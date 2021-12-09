import React, { useState } from 'react';
import "./Classification.css";

function Classification() {
    const [state, setState] = useState({
        popup: false,
    });

    function setPopup(newPopup) {
        setState({
            ...state,
            popup: newPopup,
        });
    }

    return (
        <div className="classification">
            <div className="classificationModel">
                {/**MODEL */}

                {state.popup === "model" ?
                    <>
                        <div
                            className="classificationModel_backdrop"
                            onClick={() => setPopup(false)}
                        />
                        <div className="classificationModel_popup">
                            <button
                                className="classificationModel_x"
                                type="button"
                                onClick={() => setPopup(false)}
                            >
                                x
                            </button>

                            <h3>Create A New Model</h3>
                            Select a CSV file <input type="file"/>
                        </div>
                    </>
                    :
                    <></>
                }

                <h2>Model</h2>
                <button
                    type="button"
                    onClick={() => setPopup("model")}
                >
                    + Create New
                </button>
            </div>

        </div>
    )
}

export default Classification
