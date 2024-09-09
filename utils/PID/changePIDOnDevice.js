// -----------------------------------------------------------------------------------------------------------------------
// this function takes the PID i.e. S00161 and returns the new PID based on if to increment or decrement
export const changePIDOnDevice = (PID, IncrementValue) => {
  const PIDNumber = PID.substring(1);
  const PIDNumberPadded = PIDNumber.padStart(5, "0");

  const newPIDNumber = parseInt(PIDNumberPadded) + IncrementValue;
  const newPID = `S${newPIDNumber.toString().padStart(5, "0")}`;

  return newPID;
};
