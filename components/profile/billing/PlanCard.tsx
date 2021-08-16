import styled from "styled-components"
import { Box, useRadio } from "@chakra-ui/react"

const StyledBox = styled(Box)`
  background-color: inherit;
  color: inherit;
  flex: 1;
  cursor: pointer;
  padding: 10px 10px 10px 50px;
  margin: 0;
  text-align: left;
`

const PlanCard = ({ children, handleSelectedPlan }, props) => {
  console.log("🚀 ~ file: PlanCard.tsx ~ line 15 ~ PlanCard ~ props", props)
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <StyledBox as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </StyledBox>
  )
}

export default PlanCard
