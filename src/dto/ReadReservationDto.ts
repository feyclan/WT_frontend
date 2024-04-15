export class ReservationDto {
    id: number = 0;
    reservationRequest: string = 'PENDING';
    requestDate: Date | null = null;
    book: number = 0;
    user: number = 0;
    loan: number = 0;
}