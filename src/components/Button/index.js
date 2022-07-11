export const Button = (props) => {
  return (
    <button
      className={props?.className ?? 'btn'}
      {...props}
    >
      { props?.image ? <img alt="" width={26} height={26} src={props.image}/> : <></> }
      { props?.label ?? 'Text' }
    </button>
  );
}

export default Button;