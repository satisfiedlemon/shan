import React, { useEffect, useState } from 'react';
import { Form, useField } from 'formik';
import styled from "@emotion/styled";

function SelectTableCell({ data, value, options }) {

  const [ toggle, setToggle ] = useState(false);

  // Styled components ....
  const StyledSelect = styled.select`
    color: var(--red);
  `;

  const StyledErrorMessage = styled.div`
    font-size: 12px;
    color: var(--red-600);
    width: 400px;
    margin-top: 0.25rem;
    &:before {
      content: "❌ ";
      font-size: 10px;
    }
    @media (prefers-color-scheme: dark) {
      color: var(--red-300);
    }
  `;

  const MySelect = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <StyledSelect {...field} {...props} />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
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
              <MySelect name={data}>
                <option value="">Select</option>
                {
                  options.map((o, i) => {
                    return (
                      <React.Fragment key={i}>
                        <option value={o}>{o}</option>
                      </React.Fragment>
                    )
                  })
                }
              </MySelect>

              <button type="submit">Submit</button>
            </Form>
          :
            <p>{value}</p>
      }
    </div>
  )
}

export default SelectTableCell;