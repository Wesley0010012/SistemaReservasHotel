export interface IStrategy<Input = any, Output = any> {
    execute(input: Input): Promise<Output>
}