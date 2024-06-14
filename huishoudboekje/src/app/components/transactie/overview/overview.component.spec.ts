import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TransactieOverviewComponent } from "./overview.component";

xdescribe("OverviewComponent", () => {
    let component: TransactieOverviewComponent;
    let fixture: ComponentFixture<TransactieOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TransactieOverviewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TransactieOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
