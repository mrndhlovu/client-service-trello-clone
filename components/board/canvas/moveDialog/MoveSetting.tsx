import { Select } from "@chakra-ui/select"
import { ChangeEvent, ReactNode } from "react"

interface IProps {
  children: ReactNode
  className: string
  disabled?: boolean
  heading: string
  onChange: (ev: ChangeEvent<HTMLSelectElement>) => void
  value: string | number
}

const MoveSetting = ({
  children,
  className,
  disabled,
  heading,
  onChange,
  value,
}: IProps) => {
  return (
    <div className="setting-container">
      <label htmlFor={`select-label-${className}`}>{heading}</label>

      <Select
        value={value}
        onChange={onChange}
        id={`select-label-${className}`}
        key={`select-label-${className}`}
        disabled={disabled}
        className={`setting ${className || ""}`}
      >
        <>{children}</>
      </Select>
    </div>
  )
}

export default MoveSetting
