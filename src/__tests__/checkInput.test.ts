import { checkInput } from '../checkInput';
import { mockData } from '../__data__/mockData';

describe('checkInputs', () => {
	it('should return 1 if the input is correct', () => {
		const result = checkInput(mockData);
		expect(result.value).toEqual(1);
	});
	it('should return 0 if groups is not inserted', () => {
		const testData = JSON.parse(JSON.stringify(mockData));
		delete testData.groups;
		const result = checkInput(testData);
		expect(result.value).toEqual(0);
		expect(result.msg.length).not.toEqual(0);
	});
});
