export class ResponseDto {
    success: boolean = false;
    data: any | null = null;
    errors: [] = [];
    validationMessage: string = '';
}