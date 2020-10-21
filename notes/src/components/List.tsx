import React, { ChangeEvent } from 'react';
import './List/List.css';

export interface IItem {
    id: string;
    title: string;
    body: string;
}

interface IProps {
    items: IItem[];
    setItems: (items: IItem[]) => void;
    selectedItem?: string | null;
    selectedItemChangeCallback?: (id: string) => void;
    className?: string;
    removeItem: (id: string) => void;
    setSelectedItem: (id: string | null) => void;
}

export default class List extends React.Component<IProps> {

    render() {
        return (
            <ul className={`List ${this.props.className}`}>
                {this.props.items.map(item =>
                    <li className={`List__item ${item.id === this.props.selectedItem ? 'List__item-selected' : ''}`} onClick={() => this.selectItem(item.id)}>
                        <div className='List__element__header'>
                            <div className='List__item__title'><b>{item.title}</b></div>
                            <div className='List__delete__item ' onClick={() => {
                                this.props.setSelectedItem(null)
                                this.props.removeItem(item.id)
                            }}>&#10006;</div>
                        </div>
                        <div className='List__item__body'>{item.body}</div>
                    </li>
                )}
            </ul>
        )
    }
    selectItem(id: string) {
        this.props.selectedItemChangeCallback && this.props.selectedItemChangeCallback(id);
    }
}
