import { useState } from 'react';

export const Checkbox = (props) => {
  const [check, setCheck] = useState(true);

  const handleCheck = () => {
    setCheck(!check)
  }

  return (
    <div className={"checkbox"}>
      <input onChange={() => handleCheck()} checked={check} type="checkbox" id={props?.id ?? ''} className="checkbox__input" {...props} />
      <label htmlFor={props?.id ?? ''}>{props?.label ?? ''}</label>
    </div>
  );
}

export default Checkbox;