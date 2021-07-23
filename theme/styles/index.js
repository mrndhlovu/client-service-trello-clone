import { css } from "styled-components"

import light from "./light"
import typography from "./typography"
import reset from "./reset"
import utilities from "./utilities"

const absoluteCenter = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export default { light, typography, reset, utilities, absoluteCenter }
