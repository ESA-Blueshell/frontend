export type QuestionType = 'open' | 'radio' | 'checkbox';

export default interface FormQuestion {
  prompt: string;
  type: QuestionType;
  options?: string[];
}
