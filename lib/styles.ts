export const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    fontSize: "14px",
    cursor: "pointer",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
    backgroundColor: state.isFocused ? "#e4e9f4" : "white",
    cursor: "pointer",
    color: "black",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};
