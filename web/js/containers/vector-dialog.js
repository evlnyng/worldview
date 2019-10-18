import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ModalBody, ModalHeader, Nav, NavItem, NavLink } from 'reactstrap';

import VectorMetaTable from '../components/vector-metadata/table';

class VectorDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(activeIndex) {
    if (activeIndex === this.state.activeIndex) return;
    this.setState({ activeIndex });
  }
  render() {
    const { toggleWithClose, customProps } = this.props;
    const { vectorMetaObject } = customProps;
    const { activeIndex } = this.state;
    let navArray = [];
    let keyArray = [];
    let i = 0;
    for (let [key, value] of Object.entries(vectorMetaObject)) {
      const index = i;
      keyArray.push(key);
      navArray.push(
        <NavItem
          key={key}
          className="vector-meta-nav-item"
          active={activeIndex === i}
        >
          <NavLink onClick={() => this.updateIndex(index)}>
            {key + ' [' + (value.length) + ']'}
          </NavLink>
        </NavItem>
      )
      i++;
    }
    const activeMetaArray = vectorMetaObject[keyArray[activeIndex]];
    console.log(activeMetaArray);
    return (
      <React.Fragment>
        <ModalHeader toggle={toggleWithClose}>
          <Nav tabs id="vector-meta-nav" className="vector-meta-nav">
            {navArray}
          </Nav>
        </ ModalHeader>
        <ModalBody>
          <VectorMetaTable metaArray={activeMetaArray} title={keyArray[activeIndex]} />
        </ModalBody>
      </React.Fragment>
    )
  }
}


const mapDispatchToProps = dispatch => ({

});

export default VectorDialog;
VectorDialog.propTypes = {
  vectorMetaArray: PropTypes.Array,
  toggleWithClose: PropTypes.func
};
