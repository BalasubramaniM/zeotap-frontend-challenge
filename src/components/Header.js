import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { CHANGE_ADVERTISER, CHANGE_TIMELINE } from "../constants/actionTypes";

const mapStateToProps = state => ({
    ...state.common
});

const mapDispatchToProps = dispatch => ({
    onChangeAdvertiserName: (key, value) =>
        dispatch({ type: CHANGE_ADVERTISER, key, value }),
    onChangeTimeline: (key, value) =>
        dispatch({ type: CHANGE_TIMELINE, key, value })
});

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.getAdvertiserOptions = this.getAdvertiserOptions.bind(this);
    }

    getAdvertiserOptions = data => {
        let advertisersName = data
            .map(val => val.advertiserName)
            .filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            });

        let obj = advertisersName.map(val => {
            return { label: val, value: val };
        });

        return obj;
    };

    changeAdvertiser = ev => {
        this.props.onChangeAdvertiserName(ev.value, ev.label);
    };

    changeTimeline = ev => {
        this.props.onChangeTimeline(ev.value, ev.label);
    };

    render() {
        let advertiserOptions = [];

        const timelineOptions = [
            {
                value: 0,
                label: "All"
            },
            {
                value: 1,
                label: "Today"
            },
            {
                value: 2,
                label: "Last 7 days"
            },
            {
                value: 3,
                label: "Last quarter"
            },
            {
                value: 4,
                label: "Last month"
            },
            {
                value: 5,
                label: "Last year"
            },
            {
                value: 6,
                label: "Custom date"
            }
        ];

        if (this.props.data) {
            advertiserOptions = this.getAdvertiserOptions(this.props.data);
        }
        return (
            <nav
                className="navbar is-spaced has-shadow t-navbar"
                role="navigation"
            >
                <div className="container header">
                    <div className="navbar-menu is-active">
                        <div className="navbar-start">
                            <p className="is-size-5">&nbsp;Advertiser</p>
                            <div>
                                <Select
                                    onChange={this.changeAdvertiser}
                                    options={advertiserOptions}
                                    id="advertiser"
                                    className="advertiser"
                                />
                            </div>
                        </div>
                        <div className="navbar-end">
                            <p className="is-size-5">&nbsp;Timeline</p>
                            <div>
                                <Select
                                    onChange={this.changeTimeline}
                                    options={timelineOptions}
                                    id="timeline"
                                    className="advertiser"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
