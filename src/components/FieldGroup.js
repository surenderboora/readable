import React from 'react';
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock } from 'react-bootstrap';

export function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock className="has-error">{help}</HelpBlock>}
    </FormGroup>
  );
}