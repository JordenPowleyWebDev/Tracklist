import React from 'react';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySearchValue: props.searchValue
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(value) {
        const { searchValueChange } = this.props;

        this.setState({
            displaySearchValue: value
        }, () => {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => searchValueChange(value), 500);
        });
    }

    render() {
        const { displaySearchValue } = this.state;

        return (
            <div className={"row m-0 p-0 border-bottom border-dark-blue"}>
                <div className="col-12 m-0 p-0 px-3 search-container d-flex justify-content-center align-items-center">
                    <input
                        className={"w-100 bg-white border border-dark-blue text-dark-blue p-2"}
                        type="text"
                        value={displaySearchValue}
                        placeholder={"Search tracks..."}
                        onChange={(event) => this.handleSearchChange(event.target.value)}
                    />
                </div>
            </div>
        )
    }
}