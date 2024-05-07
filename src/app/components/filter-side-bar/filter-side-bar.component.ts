import { CommonModule, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";


@Component({
    selector: "app-filter-side-bar",
    standalone: true,
    imports: [
        NgFor,
        CommonModule,
    ],
    templateUrl: "./filter-side-bar.component.html",
    styleUrl: "./filter-side-bar.component.scss",
    })
export class FilterSideBarComponent implements OnInit {
    
}