import React from "react";

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(data);

        fetch(process.env.API_URL + this.props.action, {
            method: this.props.method || 'POST',
            body: data,
        }).then(r => console.log(r));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.children}
            </form>
        );
    }
}