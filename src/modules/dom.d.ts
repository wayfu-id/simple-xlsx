import ArrayData from "../structures/ArrayData";

type domCb = (node: Element, i?:number)=> void;

type tagAttribute = {
    name: string,
    value: string | Number
};

type elementItem = {
    tag: string,
    attributes?: tagAttribute | ArrayData<tagAttribute>,
    value?: string | Number
};

/**
 * Get children(s) of an element by given `tagName`
 */
export function findChild(node: Element, tagName: string): Element;
export function findChild(node: Element, tagName: string, all: true): ArrayData<Element>;

/**
 * Get Element Tag Name
 */
export function getTagName(element: Element): string;

/**
 * Get outer XML content
 */
export function getOuterXml(node: Element): string;

/**
 * Do given function on every childrens by given `tagName`
 */
export function forEach(node: Element, tagName: string, func: domCb): void;

/**
 * Get Array of returned function 
 */
export function map(node: Element, tagName: string, func: domCb): ArrayData<domCb>;

/**
 * Create new XML Documents
 */
export function createXml(root?: elementItem | String): XMLDocument;

/**
 * Create an XML elements
 */
export function createXmlElement(details: string, doc: XMLDocument): Element;
export function createXmlElement(details: elementItem, doc: XMLDocument): Element;

/**
 * Create and append it to parent
 * If parents are null, then append it to root
 */
export function addXmlElement(xml: XMLDocument, items: elementItem, parent: string | Element | null): XMLDocument
export function addXmlElement(xml: XMLDocument, items: Element, parent: string | Element | null): XMLDocument
export function addXmlElement(xml: XMLDocument, items: ArrayData<elementItem | Element>, parent: string | Element | null): XMLDocument