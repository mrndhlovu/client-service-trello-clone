import { css } from "styled-components"

import darkMode from "./dark-mode"
import typography from "./typography"
import reset from "./reset"
import utilities from "./utilities"

const absoluteCenter = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export default { darkMode, typography, reset, utilities, absoluteCenter }
