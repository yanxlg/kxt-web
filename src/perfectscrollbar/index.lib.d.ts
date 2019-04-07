import {IScrollFactoryOptions} from './perfectscrollbarfactory';

export default class PerfectScrollbar {
    constructor(element:HTMLElement,setting: IScrollFactoryOptions);
    public element:HTMLElement;
    public update():void;
    public destroy():void;
}