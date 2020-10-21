import React, { ChangeEvent } from 'react'
import './Editor/Editor.css';
// @ts-ignore
import * as debounce from 'debounce';

interface IProps {
    title?: string;
    body?: string;
    id: string;
    titleChangedCallback: (title: string) => void;
    bodyChangedCallback: (body: string) => void;
    saveCallback?: () => void;
    className?: string;
    removeItem: (title: string) => void;
}

export default class Editor extends React.Component<IProps> {
    private _saveCallback: Function;

    constructor(props: IProps) {
        super(props);
        
        this._saveCallback = debounce(this.save, 1000);
    }
    render() {
        return (
            <div className='Editor'>
                <input className='Editor__title' value={this.props.title} onChange={this.handleTitleChange} onBlur={() => this._saveCallback} placeholder='Название' /><br />
                <textarea className='Editor__body' value={this.props.body} onChange={this.handleBodyChange} onBlur={() => this._saveCallback} placeholder='Текст' />
            </div>
        )
    }
    handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.titleChangedCallback(event.target.value);
        this._saveCallback();
    }
    handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        this.props.bodyChangedCallback(event.target.value);
        this._saveCallback();
    }
    save = () => {
        this.props.saveCallback && this.props.saveCallback();
    }
}