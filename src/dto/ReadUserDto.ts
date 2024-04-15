export class ReadUserDto {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    role: string = '';
    reviews: [] = [];
    reservations: [] = [];
    loans: [] = [];
}