import "./styles.css";
import React, { Children } from "react";

const CustomSwitch = ({ children, value }) => {
  const cases = [];
  const defaults = [];
  Children.forEach(children, (e) => {
    if (e.type.name === "CustomCase") {
      if (typeof e.props.value === "function") {
        if (e.props.value(value)) {
          cases.push(e);
        }
      } else if (value === e.props.value) {
        cases.push(e);
      }
    } else if (e.type.name === "DefaultCase") {
      defaults.push(e);
    }
  });
  if (cases.length > 0) {
    return cases;
  } else {
    return defaults;
  }
};

const CustomCase = ({ children }) => {
  return <>{children}</>;
};

const DefaultCase = ({ children }) => {
  return <>{children}</>;
};

export default function App() {
  return (
    <>
      <CustomSwitch value="20">
        <CustomCase value={(e) => e > 10}>
          <div>Hello 10</div>
        </CustomCase>
        <CustomCase value="20">Hello 20</CustomCase>
        <CustomCase value="30">Hello 30</CustomCase>
        <CustomCase value="10">
          <div>Hello 10</div>
        </CustomCase>
        <DefaultCase>Helllo 40</DefaultCase>
      </CustomSwitch>
    </>
  );
}
