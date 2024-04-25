export class ReadBookDto {
    id: number = 0;
    description: string = '';
    isbn: string = '';
    title: string = '';
    imageLink: string = '';
    copyCount: number = 0;
    publishingDate: Date | null = null;
    authors: [] = [];
    categories: [] = [];
    availableCopyCount: number = 0;
}