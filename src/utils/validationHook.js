import React from "react";

//хук управления формой и валидации формы
export function useFormWithValidation(someParameter) {
  const [values, setValues] = React.useState(someParameter);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  return { values, handleChange, errors, isValid };
}