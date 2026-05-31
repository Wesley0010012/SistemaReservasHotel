export abstract class AbstractEntity {
    private _id: number | null;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _active: boolean;

    constructor(
        id: number | null = null,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        active: boolean = true,
    ) {
        this._id = id;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._active = active;
    }

    public get id(): number | null {
        return this._id;
    }

    public set id(id: number | null) {
        this._id = id;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }

    public get active(): boolean {
        return this._active;
    }

    public touch(): void {
        this._updatedAt = new Date();
    }

    public deactivate(): void {
        this._active = false;
        this.touch();
    }
}
