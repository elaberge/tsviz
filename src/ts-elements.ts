
export enum Visibility {
	Private,
	Public,
	Protected
}

export class QualifiedName {
	private nameParts: string[];
	
	constructor(...nameParts: string[]) {
		this.nameParts = nameParts;
	}
	
	public get fullyQualifiedName(): string {
		return this.nameParts.reduce((prev, curr) => prev + "." + curr, "").substr(1);
	}
}

export abstract class Element {
	constructor(private _name: string, private _visibility: Visibility) { }
	
	public get name(): string {
		return this._name;
	}
	
	public get visibility() : Visibility {
		return this._visibility;
	}
	
	public addElement(element: Element) {
		this.getElementCollection(element).push(element);
	}
	
	protected getElementCollection(element: Element) : Array<Element> {
		throw new Error(typeof element + " not supported in " + typeof this);
	}
} 


export class Module extends Element {
	private _classes: Class[] = new Array<Class>();
	
	public get classes(): Array<Class> {
		return this._classes;
	}
	
	protected getElementCollection(element: Element) : Array<Element> {
		if (element instanceof Class) {
			return this.classes;
		}
		return super.getElementCollection(element);
	}
}

export class Class extends Element {
	private _methods = new Array<Method>();
	private extendingClass: QualifiedName;
	
	public get methods(): Array<Method> {
		return this._methods;
	}
	
	protected getElementCollection(element: Element) : Array<Element> {
		if (element instanceof Method) {
			return this.methods;
		}
		return super.getElementCollection(element);
	}
	
	public get extends(): QualifiedName {
		return this.extendingClass;
	}
	
	public set extends(extendingClass: QualifiedName) {
		this.extendingClass = extendingClass;
	}
}

export class Method extends Element {
	
}
