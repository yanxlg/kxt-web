import { PPCW } from '../ppcw';
import Page = PPCW.Page;
import Part = PPCW.Part;
import TopPart = PPCW.TopPart;
declare class IDLog {
    static prefix: string;
    static getFunctionName(constractor: Function): string;
    static generatePageID(page: Page | string): string;
    static generatePartID(part: Part, pageID: string): string;
    static generatePublicPartID(part: TopPart): string;
    static generateComponentID(componentID: string, parentID: string): string;
    static generateWidgetID(widgetID: string, parentID: string): string;
}
export { IDLog };
