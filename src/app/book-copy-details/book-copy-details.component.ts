import { Component, Input } from '@angular/core';
import { ReadBookCopyDto } from '../../dto/ReadBookCopyDto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[app-book-copy-details]',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-copy-details.component.html',
  styleUrl: './book-copy-details.component.scss'
})


export class BookCopyDetailsComponent {
  @Input() bookCopy: ReadBookCopyDto | null = null;

}
