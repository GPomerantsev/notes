import React, { ChangeEvent } from 'react'
import './Editor/Editor.css';

interface IProps {
    title?: string;
    body?: string;
    id: string;
    titleChangedCallback: (title: string) => void;
    bodyChangedCallback: (body: string) => void;
    disabledChangedCallback: () => void;
    disabled?: boolean;
    className?: string;
    removeItem: (title: string) => void;
}

export default class Editor extends React.Component<IProps> {
    render() {
        return (
            <div className='Editor'>
                <div className='Editor__header'>
                    <button className='Editor__button__edit' onClick={this.props.disabledChangedCallback} hidden={!this.props.disabled}>Редактировать</button>
                    <button className='Editor__button__remove' onClick={() => this.props.removeItem(this.props.id)}>Удалить</button>
                </div>
                <input className='Editor__title' value={this.props.title} onChange={this.handleTitleChange} disabled={this.props.disabled} placeholder='Название' /><br />
                <textarea className='Editor__body' value={this.props.body} onChange={this.handleBodyChange} disabled={this.props.disabled} placeholder='Текст' />
            </div>
        )
    }
    handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.titleChangedCallback(event.target.value);
    }
    handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        this.props.bodyChangedCallback(event.target.value);
    }

}