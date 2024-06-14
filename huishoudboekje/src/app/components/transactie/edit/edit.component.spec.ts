import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TransactieEditComponent } from "./edit.component";

xdescribe("EditComponent", () => {
    let component: TransactieEditComponent;
    let fixture: ComponentFixture<TransactieEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TransactieEditComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TransactieEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
