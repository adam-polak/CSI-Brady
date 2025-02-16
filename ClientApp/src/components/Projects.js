import React, { Component } from 'react';
import CreateProject from './CreateProject';
import ProjectsContainer from './ProjectsContainer';

export class Projects extends Component {
    render() {
        return (
          <div>
            Projects
            <CreateProject />
            <ProjectsContainer />
          </div>
        );
    }
}