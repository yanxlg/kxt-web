/// <reference types="react" />
import * as React from 'react';
declare namespace PPCW {
    interface PartProps {
        pageID: string;
    }
    interface ComponentProps {
        partID: string;
        id?: string;
    }
    interface WidgetProps {
        id?: string;
    }
    abstract class Page<P = {}, M = {}> extends React.Component<P, M> {
        constructor(props?: P, context?: any);
        type: "page";
        abstract render(): JSX.Element | null;
        getID(): string;
    }
    abstract class Part<P extends PartProps = PartProps, M = {}> extends React.Component<P, M> {
        constructor(props?: P, context?: any);
        limit: Function;
        regLimit: Function;
        type: "part";
        abstract render(): JSX.Element | null;
        getID(): string;
        getComponentID(componentID: string): string;
        getWidgetID(id: string): string;
    }
    abstract class Component<P extends ComponentProps = ComponentProps, M = {}> extends React.Component<P, M> {
        constructor(props?: P, context?: any);
        limit: Function;
        regLimit: Function;
        type: "component";
        abstract render(): JSX.Element | null;
        getID(): string;
        getExtraComponentID(componentID: string): string;
        getWidgetID(id: string): string;
    }
    abstract class Widget<P extends WidgetProps = WidgetProps, M = {}> extends React.Component<P, M> {
        constructor(props?: P, context?: any);
        type: "widget";
        abstract render(): JSX.Element | null;
    }
    abstract class TopPart<P = {}, M = {}> extends React.Component<P, M> {
        constructor(props?: P, context?: any);
        abstract render(): JSX.Element;
        getID(): string;
        getComponentID(componentID: string): string;
        getWidgetID(id: string): string;
    }
}
declare const Widget: typeof PPCW.Widget;
declare const Page: typeof PPCW.Page;
declare const Part: typeof PPCW.Part;
declare const Component: typeof PPCW.Component;
declare const TopPart: typeof PPCW.TopPart;
export { PPCW, Page, Part, Component, Widget, TopPart };
