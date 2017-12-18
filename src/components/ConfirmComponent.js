import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

class ConfirmComponent extends React.Component {
  render() {
    return (
      <div>
        <Modal show={this.props.visible} onHide={this.props.close}>
          <Modal.Header closeButton onClick={this.props.close}>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.props.action}>
              Ok
            </Button>
            <Button onClick={this.props.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ConfirmComponent.propTypes = {
  action: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  visible: PropTypes.bool
};

export default ConfirmComponent;
