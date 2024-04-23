export class LoanDto {
    id?: number;
    conditionStart?: string;
    conditionEnd?: string;
    startDate?: Date;
    endDate?: Date;
    bookCopyId?: number;
    isActive?: Boolean;
    userId?: number;
    bookTitle?: string;
    bookAuthors?: [];
}