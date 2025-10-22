import React, { Component } from 'react';
import $ from "jquery";
import { Container } from 'reactstrap';
import { withTranslation } from 'react-i18next';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
