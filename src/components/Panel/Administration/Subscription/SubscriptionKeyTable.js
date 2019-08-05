import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import SubscriptionKeyTableActionForm from "./SubscriptionKeyTableActionForm";

class SubscriptionKeyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    Header: 'Key',
                    accessor: 'token'
                },
                {
                    Header: 'Time',
                    accessor: 'subscriptionTime'
                },
                {
                    Header: 'Build',
                    accessor: 'buildNumber'
                },
                {
                    Header: 'Action',
                    accessor: 'id',
                    Cell: x => <SubscriptionKeyTableActionForm id={x.row.id} onSuccess={props.onSuccess} />
                }
            ]
        }
    }

    render() {
        const {data} = this.props;
        return (
            <div className="w-75 mx-auto mb-5">
                <h2 className="sub-title">Subscriptions keys <span className="badge badge-warning">{data.length}</span></h2>
                <ReactTable
                    data={data}
                    columns={this.state.columns}
                    defaultPageSize={15}
                    minRows={3}
                    defaultSorted={[
                        {
                            id: "id",
                            desc: true
                        }
                    ]}
                />
            </div>

        );
    }
}

export default SubscriptionKeyTable;