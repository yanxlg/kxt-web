import { History as RouterHistory, LocationState } from 'history';
export declare class History {
    static history: RouterHistory;
    static setHistory(history: RouterHistory): void;
    static push(path: string, state?: LocationState): void;
    static replace(path: string, state?: LocationState): void;
    static go(n: number): void;
    static goForward(): void;
    static goBack(): void;
}
