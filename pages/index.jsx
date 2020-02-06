import React from 'react';
import { connect } from 'react-redux';
import Header from '../shared/Header';

function Index() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default connect()(Index);
