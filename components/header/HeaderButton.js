const HeaderButton = ({ children, className = "header-button" }) => {
  return (
    <span className={className}>
      <span>{children}</span>
    </span>
  )
}

export default HeaderButton
