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
    this.setState(activeIndex);
  }
  render() {
    const { toggleWithClose, customProps } = this.props;
    const { vectorMetaArray } = customProps;
    console.log(vectorMetaArray)
    const { activeIndex } = this.state;
    return (
      <React.Fragment>
        <ModalHeader toggle={toggleWithClose}>
          <Nav tabs id="vector-meta-nav" className="vector-meta-nav">
            {vectorMetaArray.map((meta, i) => (
              <NavItem
                key={meta.featureId}
                className="vector-meta-nav-item"
                active={activeIndex === i}
              >
                <NavLink onClick={() => this.updateIndex(i)}>
                  {meta.title}
                </NavLink>
              </NavItem>
            )
            )}
          </Nav>
        </ ModalHeader>
        <ModalBody>
          <VectorMetaTable metaFeatures={vectorMetaArray[activeIndex].features} metaLegend={vectorMetaArray[activeIndex].legend} />
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
