import React from 'react';
import InputMask from "react-input-mask";

export const Input = (props) => {
  return (
    <>
      <label className={'input'}>
        <label htmlFor={props?.name ?? ''}>
          {props?.label ?? ''}
        </label>
        <InputMask
          mask="999-999-999"
          onChange={(e) => props.onChange(e)}
          name={props?.name ?? ''}
          id={props?.name ?? ''}
          type={props?.type ?? 'text'}
          placeholder={props?.placeholder ?? ''}
          value={props?.value ?? ''}
          className={props.error ? 'error' : ''}
          {...props}
        />
        {
          props.error ? <span className={"input__error"}>Field filled incorrectly</span> : <></>
        }
      </label>
    </>
  )
}

export default Input;