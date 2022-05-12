type ICompare<T> = (a:T, b:T) => boolean

class Factor<T> {
    constructor(values: T[], levels: T[], compare: ICompare<T>) {
        this._values = values;
        this._levels = levels;
        this._compare = compare;
    }

    private isInValuesArray(v: T): boolean {
        return this._levels.find((l) => this._compare(v,l)) !== undefined
    }

    private _sort(): T[] {
        const sortedValues = [
            ...this._levels.reduce((prev, acc)=>  [
                ...prev, 
                ...this._values.filter((val) => val === acc)] ,[])
            ]
        const otherValues = this._values.filter((v)=> !this.isInValuesArray(v))

        if(otherValues.length > 0) {
            console.warn('You have elements not included in values field array: ', otherValues)
        }

        return [...sortedValues, ...otherValues]
    }

    sort(): T[] {
        return this._sort()
    }

    getValues() { return this._values }
    getLevels() { return this._levels }
    setValues(v: T[]) { this._values = v }
    setLevels(v: T[]) { this._levels = v }
    setCompare(v: ICompare<T>) { this._compare = v }

    private _values: T[];
    private _levels: T[];
    private _compare: ICompare<T>
}

const v = new Factor<string>(['m','l','s','xl','m','s','xxl','xs'],['xs','s','m','l'], (a,b) => a === b)
console.log(v.sort())

// v.setLevels(v.getLevels().reverse())
// console.log(v.sort())

// v.sort = () => ['overwrite']
// console.log(v.sort())

// console.log('stress test')
// const levels = ['s','m','l', 'xl','xxl']
// const sizes = [...[...new Array(1000000)].map(()=> levels[Math.floor(Math.random()*levels.length)]), 'other']
// const stress = new Factor(sizes, levels, (a,b) => a === b);
// console.log(stress.sort())
