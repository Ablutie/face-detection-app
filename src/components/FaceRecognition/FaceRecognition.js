import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ url, box }) => {
    return (
        <div className="ma center">
            <div className="absolute mt2">
                <img id="image-detect" src={url} alt="face recognition" width='500px' height='auto' />
                <div className="bounding-box" style={{ top: box.top_row, bottom: box.bottom_row, left: box.left_col, right: box.right_col }}></div>
            </div>
            {/* <div className="bounding-box" style={{top: box.top_row+'px', bottom: box.bottom_row+'px', left: box.left_col+'px', right: box.right_col+'px'}}></div> */}
            {/* <div className="bounding-box" style={{top: 10+'px', left: 10+'px', width: 100+'px', height: 100+'px'}}></div> */}
        </div>
    );
}

export default FaceRecognition;

// top_row: coordinates.top_row,
// left_col: coordinates.left_col,
// bottom_row: coordinates.bottom_row,
// right_col: coordinates.right_col