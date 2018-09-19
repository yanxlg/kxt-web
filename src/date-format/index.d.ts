declare class DateFormat {
    static parseDateString(date: any): string | number | null;
    static getDate(date?: string): string;
    static getDay(date?: string): string;
    static getTime(date?: string): string;
    static getSecondTime(date?: string): string;
    static getFullTime(date?: string): string;
    static getAllTime(date?: string): string;
}
export { DateFormat };
