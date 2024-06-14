import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    MatDatepicker,
    MatDatepickerModule,
} from "@angular/material/datepicker";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
const moment = _rollupMoment || _moment;
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";

export const MY_FORMATS = {
    parse: {
        dateInput: "MM-YYYY",
    },
    display: {
        dateInput: "MM-YYYY",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY",
    },
};

@Component({
    selector: "app-month-picker",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatLabel,
        ReactiveFormsModule,
    ],
    providers: [provideMomentDateAdapter(MY_FORMATS)],
    templateUrl: "./month-picker.component.html",
    styleUrl: "./month-picker.component.scss",
})
export class MonthPickerComponent {
    public date = new FormControl(moment());
    @Output() dateChange: EventEmitter<Moment> = new EventEmitter<Moment>();
    constructor() {}

    public setMonthAndYear(
        normalizedMonthAndYear: Moment,
        datepicker: MatDatepicker<Moment>
    ) {
        const ctrlValue = this.date.value ?? moment();
        ctrlValue.month(normalizedMonthAndYear.month());
        ctrlValue.year(normalizedMonthAndYear.year());
        this.date.setValue(ctrlValue);
        datepicker.close();
        this.dateChange.emit(ctrlValue);
    }
}
