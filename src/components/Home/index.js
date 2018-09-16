import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    ...state.common
});

class Header extends React.Component {
    changeDateFormat = value => {
        if (value === null) {
            return null;
        }

        let val = value.split(/\-/);
        return val[2] + "-" + val[1] + "-" + val[0];
    };

    /**
     * Get the filtered data.
     * Filter array of data specific to Advertisers.
     * Map array of filtered data to get specific Campaigns related to Advertisers.
     * Finally, sort them using the budget of the campaign (from higher to lower).
     * @param  {Array} data [Array of data.]
     * @return {Arrayt}     [Filtered array.]
     */
    getFilteredData = data => {
        return (
            data
                // Filter campaigns specific to Advertisers.
                .filter(
                    val => val.advertiserName === this.props.advertiser.value
                )
                // Map campaigns specific to Advertisers.
                .map(val => {
                    return {
                        brandName: val.name,
                        firstCampaignName:
                            val.campaigns.length > 0
                                ? val.campaigns[0].name
                                : "(No campaigns)",
                        campaignsCount: val.campaigns.length,
                        budget: val.budget,
                        startDate:
                            val.campaigns.length > 0
                                ? val.campaigns[0].start_date
                                : null
                    };
                })
                // Sort campaigns based on the budget.
                .sort((a, b) => b.budget - a.budget)
        );
    };

    getTimelineFilteredData = data => {
        switch (this.props.timeline.value) {
            case "Today":
                let today = new Date().toISOString().slice(0, 10);
                return data.filter(
                    val => this.changeDateFormat(val.startDate) === today
                );

            case "Last 7 days":
                let d = new Date();
                d.setDate(d.getDate() - 7);
                let lastWeekISO = d.toISOString().slice(0, 10);

                lastWeekISO = new Date(lastWeekISO);

                return data.filter(val => {
                    let properDate = new Date(
                        this.changeDateFormat(val.startDate)
                    );

                    return properDate > lastWeekISO;
                });

            default:
                return data;
        }
    };

    render() {
        if (this.props.data) {
            let campaigners = [];
            if (this.props.advertiser.key !== -1) {
                let data = this.props.data;

                campaigners = this.getFilteredData(data);

                // Check whether timeline is set.
                if (this.props.timeline.key !== -1) {
                    campaigners = this.getTimelineFilteredData(campaigners);
                }
            }

            return (
                <section className="section home">
                    <div className="container">
                        <nav className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <p>Hello {this.props.advertiser.value} !</p>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <p>
                                        Showing {this.props.timeline.value} data
                                    </p>
                                </div>
                            </div>
                        </nav>
                        <div className="table">
                            <table
                                id="movies_table"
                                className="table is-bordered is-fullwidth"
                            >
                                <thead>
                                    <tr>
                                        <th>Brand Name</th>
                                        <th>First Campaign Name</th>
                                        <th>Count of Campaigns inside brand</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campaigners.map((val, index) => (
                                        <tr key={index}>
                                            <td>{val.brandName}</td>
                                            <td>{val.firstCampaignName}</td>
                                            <td>{val.campaignsCount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            );
        } else {
            return <div />;
        }
    }
}

export default connect(
    mapStateToProps,
    null
)(Header);
