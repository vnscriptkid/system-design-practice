export class CategoryData {
    public constructor(
        public readonly id: string,
        public readonly name: string,
    ) { }

    public static build(data: CategoryData): CategoryData {
        return new CategoryData(data.id, data.name);
    }
}