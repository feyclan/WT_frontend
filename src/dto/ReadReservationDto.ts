export class ReservationDto {
    id: number = 0;
    reservationRequest: string = 'PENDING';
    requestDate: Date | null = null;
    bookId: number = 0;
    userId: number = 0;
    loanId: number = 0;
}