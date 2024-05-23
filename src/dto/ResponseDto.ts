export class ResponseDto {
    forEach(arg0: (author: any) => void) {
      throw new Error("Method not implemented.");
    }
    success: boolean = false;
    data: any | null = null;
    errors: [] = [];
    validationMessage: string = '';
}