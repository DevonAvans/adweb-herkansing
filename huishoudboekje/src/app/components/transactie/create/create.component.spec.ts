import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TransactieCreateComponent } from "./create.component";

describe("CreateComponent", () => {
    let component: TransactieCreateComponent;
    let fixture: ComponentFixture<TransactieCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TransactieCreateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TransactieCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
