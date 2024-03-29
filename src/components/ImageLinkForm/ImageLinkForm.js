import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onBtnSubmit}) => {
  return (
    <div>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Git it a try.'}
      </p>
      <div className="center">
        <div className='form center pa4 br3 shadow-5'>
          <input className='dib f4 pa2 w-70' type='text' onInput={onInputChange} />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onBtnSubmit} >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;