import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    InputSignalWithTransform,
    ViewChild
} from '@angular/core';
import { Offer } from '../../models/offers.types';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

@Component({
    selector: 'app-offers-table',
    imports: [
        MatTableModule, MatSortModule
    ],
    templateUrl: './offers-table.html',
    styleUrl: './offers-table.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersTable implements AfterViewInit {
    public offers: InputSignalWithTransform<MatTableDataSource<Offer>, Offer[]> = input.required(
        {transform: (v: Offer[]) => new MatTableDataSource(v)}
    );
    private _liveAnnouncer = inject(LiveAnnouncer);

    displayedColumns: string[] = ['id', 'product', 'price', 'volume', 'updatedAt'];

    @ViewChild(MatSort) sort!: MatSort;

    ngAfterViewInit(): void {
        this.offers().sort = this.sort;
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
