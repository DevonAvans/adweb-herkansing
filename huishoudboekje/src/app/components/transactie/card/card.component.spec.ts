import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TransactieCardComponent } from "./card.component";

describe("CardComponent", () => {
    let component: TransactieCardComponent;
    let fixture: ComponentFixture<TransactieCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TransactieCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TransactieCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
