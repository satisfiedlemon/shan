import React, { useEffect, useState } from 'react';
import { Form, useField } from 'formik';
import styled from "@emotion/styled";

function InputTableCell({ data, value, type }) {

  const [ toggle, setToggle ] = useState(false);

  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  return (
    <div onClick={() => setToggle(true)}>
      {
        toggle
          ?
            <Form>
              <MyTextInput
                name={data}
                type={type}
                placeholder={value}
              />
              <button type="submit">Submit</button>
              <button>Cancel</button>
            </Form>
          :
            <p>{value}</p>
      }
    </div>
  )
}

export default InputTableCell;