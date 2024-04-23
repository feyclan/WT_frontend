export class CreateBookDto {
    title: string = '';
    description: string = '';
    publishingDate: Date | null = null;
    isbn: string = '';
    authors: [] = [];
    categories: [] = [];
    states: string[] = [];
}