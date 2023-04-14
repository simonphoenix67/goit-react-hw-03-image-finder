import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    };

    state = {}

    componentDidMount() {
        window.addEventListener('keydown', this.clickEsc);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.clickEsc);
    }

    clickBackdrop = event => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    }

    clickEsc = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    }


    render() {
        return (
            <div onClick={this.clickBackdrop} className='Overlay'>
                <div className='Modal'>
                    <img src={this.props.url} alt="" />
                </div>
            </div>
        )
    }
}
