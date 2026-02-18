import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    InputSignal,
    ViewChild
} from '@angular/core';
import { Offer } from '../../models/offers.types';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
    selector: 'app-offers-table',
    imports: [
        MatTableModule, MatTable, MatSort
    ],
    templateUrl: './offers-table.html',
    styleUrl: './offers-table.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersTable {
    public offers: InputSignal<Offer[]> = input.required();
    private _liveAnnouncer = inject(LiveAnnouncer);

    displayedColumns: string[] = ['id', 'product', 'price', 'volume', 'updatedAt'];
    // dataSource: MatTableDataSource<Offer[]>;

    @ViewChild(MatSort) sort!: MatSort;

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
