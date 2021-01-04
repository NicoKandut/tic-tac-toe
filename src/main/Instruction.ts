export type IndexInstruction = number;
export type ControlInstruction = "reset";

type Instruction = IndexInstruction | ControlInstruction;
export default Instruction;
