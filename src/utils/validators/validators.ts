export type  FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => {
	if (value)
		return undefined;
	return 'Field is required';
};

export const maxLengthCreator = (maxLength: number): FieldValidatorType => value => {
	if (value.length > maxLength)
		return `Max length is ${maxLength} symbols`;
	return undefined;
};
// type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
// type GetActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>

// export const maxLength30 = value => {
// 	if (value.length > 30)
// 		return "Max length is 30 symbols";
// 	return undefined;
// };