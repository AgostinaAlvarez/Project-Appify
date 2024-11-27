import React, { useState, useRef, useEffect } from 'react';

const CodigoVerificacion = () => {
  const [inputs, setInputs] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value.slice(0, 1);

    setInputs(newInputs);

    // Mover el enfoque automáticamente
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !inputs[index]) {
      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        inputRefs.current[previousIndex].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 4).split('');
    pasteData.forEach((value, i) => {
      handleChange(i, value);
      if (i < 3) inputRefs.current[i + 1].focus();
    });
  };

  const inputStyle = {
    width: '60px', 
    height: '60px',
    marginRight: '10px',
    fontSize: '25px',
    textAlign: 'center',
    border: '2px solid #ccc',
    borderRadius: '8px'
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', display: 'flex', justifyContent: 'center' }} onPaste={handlePaste}>
      {inputs.map((value, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          name={`input-${index}`}
          type="tel"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={inputStyle}
        />
      ))}
    </div>
  );
};

export default CodigoVerificacion;
