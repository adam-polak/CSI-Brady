import React, { Component } from 'react';
import { ForceLogin } from './ForceLogin';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <ForceLogin redirectRoute={"/counter"} />
      </div>
    );
  }
}
