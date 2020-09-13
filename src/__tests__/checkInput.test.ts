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
	it('should return 0 if events is not inserted', () => {
		const testData = JSON.parse(JSON.stringify(mockData));
		delete testData.events;
		const result = checkInput(testData);
		expect(result.value).toEqual(0);
		expect(result.msg.length).not.toEqual(0);
	});
	it('should return 0 if list is not defined', () => {
		const testData = JSON.parse(JSON.stringify(mockData));
		delete testData.L;
		const result = checkInput(testData);
		expect(result.value).toEqual(0);
		expect(result.msg.length).not.toEqual(0);
	});
	it('should return 0 if event field in list does not map to an actual event', () => {
		const testData = JSON.parse(JSON.stringify(mockData));
		testData.L[0].event = 9;
		const result = checkInput(testData);
		expect(result.value).toEqual(0);
		expect(result.msg.length).not.toEqual(0);
	});
	it('should return 0 if event field in a list is not the groups preference', () => {
		const testData = JSON.parse(JSON.stringify(mockData));
		testData.L[3].event = 1;
		const result = checkInput(testData);
		expect(result.value).toEqual(0);
		expect(result.msg.length).not.toEqual(0);
	});
	it('should return 0 if updateL is not in input', () => {
		const testData = JSON.parse(JSON.stringify(mockData));
		delete testData.updateL;
		const result = checkInput(testData);
		expect(result.value).toEqual(0);
		expect(result.msg.length).not.toEqual(0);
	});
});
